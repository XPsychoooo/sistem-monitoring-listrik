export default function TariffsData() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pengaturan Tarif Listrik</h1>
                    <p className="text-gray-500 mt-1">Kelola harga per kWh dan batas peringatan harian</p>
                </div>
            </div>

            <div className="max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="tarif" className="block text-sm font-medium text-gray-700 mb-2">
                            Tarif Dasar per kWh (Rp)
                        </label>
                        <input
                            type="number"
                            id="tarif"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                            placeholder="Contoh: 1444.70"
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="batas" className="block text-sm font-medium text-gray-700 mb-2">
                            Batas Maksimal Penggunaan Harian (kWh)
                        </label>
                        <input
                            type="number"
                            id="batas"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                            placeholder="Contoh: 50"
                            disabled
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            Notifikasi peringatan akan muncul jika konsumsi harian melewati batas ini.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="button"
                            disabled
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Simpan Pengaturan
                        </button>
                    </div>
                    <p className="text-sm text-amber-600 text-center mt-4">
                        * Form ini akan dinonaktifkan hingga API backend (Firebase) siap digunakan.
                    </p>
                </form>
            </div>
        </div>
    );
}
