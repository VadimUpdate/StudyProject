import { useEffect, useState } from "react";

function App() {
    const [setting, setSetting] = useState({ value: "" });
    const [buttonText, setButtonText] = useState("Сохранить");
    const [fetchedSetting, setFetchedSetting] = useState(null);
    const [id, setId] = useState("");
    const [updateId, setUpdateId] = useState('');
    const [updateValue, setUpdateValue] = useState('');

    const handleChange = (e) => {
        setSetting({ ...setting, value: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: setting.value })
            });

            if (!response.ok) throw new Error("Ошибка при сохранении");
            await response.json();
            setButtonText("Сохранено");
            setTimeout(() => setButtonText("Сохранить"), 2000);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleGetById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/settings/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok || response.status === 204) throw new Error("Нет данных для этого ID");
            const data = await response.json();
            if (!data) throw new Error("Получены пустые данные");
            setFetchedSetting(data.value);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/settings/${updateId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: parseInt(updateValue) })
            });

            if (!response.ok) throw new Error("Ошибка при обновлении");
            const data = await response.json();
            console.log("Обновлено:", data);
            alert("Успешно обновлено");
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при обновлении");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-900 — #6B7280; ">
            <div className="bg-white p-8 w-[400px] h-[600px] flex flex-col items-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Проверка запросов</h1>

                <input
                    placeholder="Запишите число"
                    className="w-[90%] p-2 border border-gray-300 mb-2"
                    value={setting.value}
                    onChange={handleChange}
                />
                <button
                    className="w-[300px] p-2 bg-blue-600 text-white hover:bg-blue-900 hover:scale-105 transition"
                    onClick={handleSave}
                >
                    {buttonText}
                </button>

                <input
                    placeholder="Введите ID"
                    className="w-[90%] p-2 border border-gray-300 mt-2"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button
                    className="w-[300px] p-2 mt-2 bg-blue-600 text-white hover:bg-blue-900 hover:scale-105 transition"
                    onClick={handleGetById}
                >
                    Получить данные по ID
                </button>

                {fetchedSetting && (
                    <div className="mt-4">
                        <h3 className=" font-bold">Полученные данные:</h3>
                        <p>{fetchedSetting}</p>
                    </div>
                )}

                <h3 className="mt-6 font-bold">Изменить значение по ID</h3>
                <input
                    type="text"
                    placeholder="ID"
                    value={updateId}
                    onChange={(e) => setUpdateId(e.target.value)}
                    className="w-[90%] p-2 border border-gray-300 mt-2"
                />
                <input
                    type="text"
                    placeholder="Новое значение"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                    className="w-[90%] p-2 border border-gray-300 mt-2"
                />
                <button
                    onClick={handleUpdate}
                    className="w-[300px] p-2 mt-2 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition"
                >
                    Обновить
                </button>
            </div>
        </div>
    );
}

export default App;
