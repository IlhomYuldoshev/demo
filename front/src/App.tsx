import { useFormik } from "formik";
import { MutableRefObject, useRef, useState } from "react";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [list, setList] = useState([]);

    const abortRef: MutableRefObject<AbortController | null> = useRef(null);
    const isEmptyList = !loading && abortRef.current && !error && !list.length;

    // In practice we will create some wrapper request to handle:
    // [loading, error, aborting request, response] states and use axios rather than fetch
    const getUsers = async (email: string, phone: string) => {
        abortRef.current?.abort();
        const currentAbort = new AbortController();
        abortRef.current = currentAbort;

        try {
            setLoading(true);
            const response = await fetch("http://localhost:9090/users/find", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    number: phone,
                }),
                signal: currentAbort.signal,
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await response.json();

            setList(data);
            setError(null);
        } catch (error) {
            if (currentAbort.signal.aborted) return;
            setError(error);
            console.log("error");
        } finally {
            if (currentAbort.signal.aborted) return;
            setLoading(false);
        }
    };

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        let formattedValue = "";
        for (let i = 0; i < value.length; i += 2) {
            if (i > 0) {
                formattedValue += "-";
            }
            formattedValue += value.substr(i, 2);
        }
        formik.handleChange({
            target: {
                value: formattedValue,
                name: "phone",
            },
        });
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
        },
        validate(values) {
            const errors = {} as { [key: string]: string };

            if (!values.email) {
                errors.email = "Email is required";
            }

            if (!values.phone) {
                errors.phone = "Phone number is required";
            }

            return errors;
        },
        onSubmit(values) {
            getUsers(values.email, values.phone);
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "10px",
                    }}
                >
                    <div>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && !!formik.errors.email && (
                            <p>{formik.errors.email}</p>
                        )}
                    </div>
                    <div>
                        <input
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            value={formik.values.phone}
                            onChange={handleChangePhone}
                        />
                        {formik.touched.phone && !!formik.errors.phone && (
                            <p>{formik.errors.phone}</p>
                        )}
                    </div>

                    <button type="submit">Find users</button>
                </div>
                {!!error && (
                    <p
                        style={{
                            color: "red",
                        }}
                    >
                        {!!error && "Fetch error"}
                    </p>
                )}
            </form>

            {loading && "Loading..."}

            {!!list.length && (
                <pre
                    style={{
                        width: "100%",
                        whiteSpace: "pre-wrap",
                        textAlign: "left",
                    }}
                >
                    {JSON.stringify(list, undefined, 4)}
                </pre>
            )}

            {isEmptyList && "Empty"}
        </>
    );
}

export default App;
