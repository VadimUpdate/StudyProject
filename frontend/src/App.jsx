import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [settings, setSettings] = useState([]);
    const [originalSettings, setOriginalSettings] = useState([]);

    useEffect(() => {
        axios.get("/api/settings")
            .then(response => {
                const first20 = response.data.slice(0, 20);
                setSettings(first20);
                setOriginalSettings(first20);
            })
            .catch(error => {
                console.error("Ошибка при загрузке настроек:", error);
            });
    }, []);

    const handleChange = (id, newValue) => {
        setSettings(prev =>
            prev.map(s => s.id === id ? { ...s, value: newValue } : s)
        );
    };

    const handleSaveAll = () => {
        const requests = settings.map(setting =>
            axios.put(`/api/settings/${setting.id}`, setting)
        );

        Promise.all(requests)
            .then(() => {
                alert("Все настройки сохранены!");
                setOriginalSettings(settings);
            })
            .catch(error => {
                console.error("Ошибка при сохранении:", error);
                alert("Ошибка при сохранении настроек.");
            });
    };

    const handleCancel = () => {
        setSettings(originalSettings);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 text-sm text-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-center">Настройки шлюза</h2>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <table className="w-full table-fixed border-collapse">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-2 w-2/3 border-b border-gray-300">Параметр</th>
                        <th className="text-left p-2 w-1/3 border-b border-gray-300">Значение</th>
                    </tr>
                    </thead>
                    <tbody>
                    {settings.map(setting => {
                        const isBoolean = setting.value === "true" || setting.value === "false";
                        const booleanValue = setting.value === "true";

                        return (
                            <tr key={setting.id} className="even:bg-gray-50">
                                <td className="p-2 border-b border-gray-200">{setting.name}</td>
                                <td className="p-2 border-b border-gray-200">
                                    {isBoolean ? (
                                        <button
                                            onClick={() =>
                                                handleChange(setting.id, (!booleanValue).toString())
                                            }
                                            className={`px-3 py-1 rounded text-xs font-medium transition ${
                                                booleanValue
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                            }`}
                                        >
                                            {booleanValue ? "Включено" : "Выключено"}
                                        </button>
                                    ) : (
                                        <input
                                            type="text"
                                            value={setting.value}
                                            onChange={(e) => handleChange(setting.id, e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        />
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                    Отменить
                </button>
                <button
                    onClick={handleSaveAll}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
}

export default App;
