import { useEffect, useState } from "react";

function App() {
    const [setting, setSetting] = useState({ value: "" });
    const [buttonText, setButtonText] = useState("Сохранить");



    const handleChange = (e) => {
        setSetting({ ...setting, value: e.target.value });
    };

    const handleSave = () => {
        fetch("http://localhost:8080/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setting),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка при сохранении");
                }
                setButtonText("Сохранено");
                setTimeout(() => {
                    setButtonText("Сохранить");
                }, 2000);
            })

            .catch(error => console.error("Ошибка:", error));
    };

    return (
        <div>
            <div className="container">
                <input
                    placeholder="Запишите сумму"
                    className="input"
                    value={setting.value}
                    onChange={handleChange}
                />
                <button
                    id="btn-save"
                    className="save-btn"
                    onClick={handleSave}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default App;
