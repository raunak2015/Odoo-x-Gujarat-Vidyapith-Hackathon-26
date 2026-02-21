import { useState } from 'react';
import { useApp } from '../context/AppContext';
import DataTable from '../components/ui/DataTable';
import StatusPill from '../components/ui/StatusPill';
import Modal from '../components/ui/Modal';
import { Plus, CheckCircle } from 'lucide-react';
import './PageCommon.css';

export default function MaintenancePage() {
    const { state, dispatch } = useApp();
    const { vehicles, maintenance } = state;
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ vehicleId: '', serviceType: 'Oil Change', description: '', cost: '', serviceDate: '', nextDueDate: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_MAINTENANCE', payload: { ...form, cost: Number(form.cost) } });
        setModalOpen(false);
        setForm({ vehicleId: '', serviceType: 'Oil Change', description: '', cost: '', serviceDate: '', nextDueDate: '' });
    };

    const nonRetiredVehicles = vehicles.filter(v => v.status !== 'Retired');

    const columns = [
        {
            key: 'vehicle', label: 'Vehicle', accessor: row => vehicles.find(v => v.id === row.vehicleId)?.name || '—', render: row => {
                const v = vehicles.find(ve => ve.id === row.vehicleId);
                return <div><strong>{v?.name || '—'}</strong><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v?.licensePlate}</span></div>;
            }
        },
        { key: 'type', label: 'Service Type', accessor: 'serviceType' },
        { key: 'description', label: 'Description', accessor: 'description' },
        { key: 'cost', label: 'Cost (₹)', accessor: 'cost', render: row => `₹${row.cost.toLocaleString()}` },
        { key: 'date', label: 'Service Date', accessor: 'serviceDate' },
        { key: 'due', label: 'Next Due', accessor: 'nextDueDate' },
        { key: 'status', label: 'Status', accessor: 'status', render: row => <StatusPill status={row.status} /> },
        {
            key: 'actions', label: 'Actions', sortable: false, render: row => (
                row.status === 'In Progress' ? (
                    <button className="btn-icon" onClick={() => dispatch({ type: 'COMPLETE_MAINTENANCE', payload: { id: row.id, vehicleId: row.vehicleId } })} title="Mark Complete">
                        <CheckCircle size={15} />
                    </button>
                ) : null
            )
        },
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Maintenance & Service Logs</h1>
                    <p>Track preventive and reactive vehicle maintenance</p>
                </div>
                <button className="btn-primary" onClick={() => setModalOpen(true)}><Plus size={18} /> Log Service</button>
            </div>

            <div className="info-card" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    ⚠️ <strong style={{ color: '#f59e0b' }}>Auto-Logic:</strong> Adding a service log automatically moves the vehicle to <StatusPill status="In Shop" /> status, removing it from the dispatcher's selection pool.
                </p>
            </div>

            <DataTable columns={columns} data={maintenance} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Service Record">
                <form onSubmit={handleAdd} className="modal-form">
                    <div className="form-group">
                        <label>Vehicle</label>
                        <select value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })} required>
                            <option value="">Select vehicle...</option>
                            {nonRetiredVehicles.map(v => <option key={v.id} value={v.id}>{v.name} — {v.licensePlate}</option>)}
                        </select>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Service Type</label>
                            <select value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })}>
                                <option>Oil Change</option><option>Tire Rotation</option><option>Brake Inspection</option>
                                <option>Engine Repair</option><option>Battery Replacement</option><option>General Service</option><option>Other</option>
                            </select>
                        </div>
                        <div className="form-group"><label>Cost (₹)</label><input type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} required /></div>
                    </div>
                    <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} /></div>
                    <div className="form-row">
                        <div className="form-group"><label>Service Date</label><input type="date" value={form.serviceDate} onChange={e => setForm({ ...form, serviceDate: e.target.value })} required /></div>
                        <div className="form-group"><label>Next Due Date</label><input type="date" value={form.nextDueDate} onChange={e => setForm({ ...form, nextDueDate: e.target.value })} /></div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn-primary">Log Service</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
