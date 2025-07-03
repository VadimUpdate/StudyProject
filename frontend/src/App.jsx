import { useEffect, useState } from "react";

function App() {
    const [setting, setSetting] = useState({ value: "" });
    const [buttonText, setButtonText] = useState("Сохранить");
    const [fetchedSetting, setFetchedSetting] = useState(null);
    const [id, setId] = useState("");

    const handleChange = (e) => {
        setSetting({ ...setting, value: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: setting.value,
                })
            });

            if (!response.ok) {
                throw new Error("Ошибка при сохранении");
            }

            const data = await response.json();
            setButtonText("Сохранено");

            setTimeout(() => {
                setButtonText("Сохранить");
            }, 2000);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleGetById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/settings/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении данных");
            }
            if (response.status === 204) {
                throw new Error("Нет данных для этого ID");
            }

            const data = await response.json();

            if (!data) {
                throw new Error("Получены пустые данные");
            }

            const value = data.value;

            setFetchedSetting(value);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };


    return (
        <div>
            <div className="container">

                <h1 className="check-h1">Проверка запросов</h1>

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
                <input
                    placeholder="Введите ID"
                    className="input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button
                    id="btn-get"
                    className="get-btn"
                    onClick={handleGetById}
                >
                    Получить данные по ID
                </button>
                {fetchedSetting && (
                    <div>
                        <h3 class="get-h3">Полученные данные:</h3>
                        <p>{fetchedSetting}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
