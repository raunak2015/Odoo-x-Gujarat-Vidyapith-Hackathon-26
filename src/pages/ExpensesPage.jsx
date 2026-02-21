import { useState } from 'react';
import { useApp } from '../context/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import KPICard from '../components/ui/KPICard';
import { Plus, Trash2, Fuel, DollarSign, TrendingUp } from 'lucide-react';
import './PageCommon.css';

export default function ExpensesPage() {
    const { state, dispatch } = useApp();
    const { vehicles, expenses, maintenance, trips } = state;
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ vehicleId: '', tripId: '', type: 'Fuel', liters: '', cost: '', date: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_EXPENSE', payload: { ...form, liters: Number(form.liters || 0), cost: Number(form.cost) } });
        setModalOpen(false);
        setForm({ vehicleId: '', tripId: '', type: 'Fuel', liters: '', cost: '', date: '' });
    };

    const totalFuel = expenses.filter(e => e.type === 'Fuel').reduce((s, e) => s + e.cost, 0);
    const totalMaint = maintenance.reduce((s, m) => s + m.cost, 0);
    const totalOps = totalFuel + totalMaint;
    const totalLiters = expenses.filter(e => e.type === 'Fuel').reduce((s, e) => s + e.liters, 0);

    // Cost per vehicle
    const vehicleCosts = vehicles.map(v => {
        const vFuel = expenses.filter(e => e.vehicleId === v.id && e.type === 'Fuel').reduce((s, e) => s + e.cost, 0);
        const vMaint = maintenance.filter(m => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
        return { ...v, fuelCost: vFuel, maintCost: vMaint, totalCost: vFuel + vMaint };
    });

    const columns = [
        { key: 'vehicle', label: 'Vehicle', accessor: row => vehicles.find(v => v.id === row.vehicleId)?.name || '—', render: row => vehicles.find(v => v.id === row.vehicleId)?.name || '—' },
        { key: 'trip', label: 'Trip', accessor: row => { const t = trips.find(t => t.id === row.tripId); return t ? `${t.origin}→${t.destination}` : '—'; }, render: row => { const t = trips.find(tr => tr.id === row.tripId); return t ? `${t.origin} → ${t.destination}` : '—'; } },
        { key: 'type', label: 'Type', accessor: 'type' },
        { key: 'liters', label: 'Liters', accessor: 'liters', render: row => row.liters > 0 ? row.liters : '—' },
        { key: 'cost', label: 'Cost (₹)', accessor: 'cost', render: row => `₹${row.cost.toLocaleString()}` },
        { key: 'date', label: 'Date', accessor: 'date' },
        {
            key: 'actions', label: '', sortable: false, render: row => (
                <button className="btn-icon btn-danger" onClick={() => dispatch({ type: 'DELETE_EXPENSE', payload: row.id })}><Trash2 size={15} /></button>
            )
        },
    ];

    const costColumns = [
        { key: 'name', label: 'Vehicle', accessor: 'name' },
        { key: 'fuel', label: 'Fuel Cost', accessor: 'fuelCost', render: row => `₹${row.fuelCost.toLocaleString()}` },
        { key: 'maint', label: 'Maintenance', accessor: 'maintCost', render: row => `₹${row.maintCost.toLocaleString()}` },
        { key: 'total', label: 'Total Ops Cost', accessor: 'totalCost', render: row => <strong style={{ color: row.totalCost > 0 ? '#f59e0b' : 'var(--text-muted)' }}>₹{row.totalCost.toLocaleString()}</strong> },
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Expenses & Fuel Log</h1>
                    <p>Track operational costs and fuel consumption</p>
                </div>
                <button className="btn-primary" onClick={() => setModalOpen(true)}><Plus size={18} /> Add Expense</button>
            </div>

            <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                <KPICard icon={Fuel} label="Total Fuel" value={`₹${totalFuel.toLocaleString()}`} color="orange" />
                <KPICard icon={DollarSign} label="Total Maintenance" value={`₹${totalMaint.toLocaleString()}`} color="purple" />
                <KPICard icon={TrendingUp} label="Total Ops Cost" value={`₹${totalOps.toLocaleString()}`} color="red" />
                <KPICard icon={Fuel} label="Fuel Consumed" value={`${totalLiters}L`} color="blue" />
            </div>

            <DataTable columns={columns} data={expenses} />

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Cost Breakdown per Vehicle</h2>
            <DataTable columns={costColumns} data={vehicleCosts} searchable={false} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Expense">
                <form onSubmit={handleAdd} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Vehicle</label>
                            <select value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })} required>
                                <option value="">Select...</option>
                                {vehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                <option>Fuel</option><option>Toll</option><option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><label>Liters (if fuel)</label><input type="number" value={form.liters} onChange={e => setForm({ ...form, liters: e.target.value })} /></div>
                        <div className="form-group"><label>Cost (₹)</label><input type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} required /></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
                        <div className="form-group">
                            <label>Trip (optional)</label>
                            <select value={form.tripId} onChange={e => setForm({ ...form, tripId: e.target.value })}>
                                <option value="">None</option>
                                {trips.filter(t => t.vehicleId === form.vehicleId).map(t => <option key={t.id} value={t.id}>{t.origin}→{t.destination}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn-primary">Add Expense</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
