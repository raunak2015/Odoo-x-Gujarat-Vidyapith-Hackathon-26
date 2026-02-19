import { useState } from 'react';
import { useApp } from '../context/AppContext';
import DataTable from '../components/ui/DataTable';
import StatusPill from '../components/ui/StatusPill';
import Modal from '../components/ui/Modal';
import { Plus, Edit, Trash2, Power } from 'lucide-react';
import './PageCommon.css';

export default function VehiclesPage() {
    const { state, dispatch } = useApp();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', model: '', licensePlate: '', type: 'Truck', maxCapacity: '', odometer: '', region: 'North', acquisitionCost: '' });

    const openAdd = () => { setEditing(null); setForm({ name: '', model: '', licensePlate: '', type: 'Truck', maxCapacity: '', odometer: '', region: 'North', acquisitionCost: '' }); setModalOpen(true); };
    const openEdit = (v) => { setEditing(v); setForm({ ...v, maxCapacity: String(v.maxCapacity), odometer: String(v.odometer), acquisitionCost: String(v.acquisitionCost || '') }); setModalOpen(true); };

    const handleSave = (e) => {
        e.preventDefault();
        const data = { ...form, maxCapacity: Number(form.maxCapacity), odometer: Number(form.odometer), acquisitionCost: Number(form.acquisitionCost || 0) };
        if (editing) {
            dispatch({ type: 'UPDATE_VEHICLE', payload: { ...data, id: editing.id } });
        } else {
            dispatch({ type: 'ADD_VEHICLE', payload: { ...data, status: 'Available', acquiredDate: new Date().toISOString().split('T')[0] } });
        }
        setModalOpen(false);
    };

    const toggleRetire = (v) => {
        dispatch({ type: 'SET_VEHICLE_STATUS', payload: { id: v.id, status: v.status === 'Retired' ? 'Available' : 'Retired' } });
    };

    const columns = [
        { key: 'name', label: 'Vehicle', accessor: 'name', render: row => <div><strong>{row.name}</strong><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.model}</span></div> },
        { key: 'plate', label: 'License Plate', accessor: 'licensePlate' },
        { key: 'type', label: 'Type', accessor: 'type' },
        { key: 'capacity', label: 'Max Load (kg)', accessor: 'maxCapacity', render: row => row.maxCapacity.toLocaleString() },
        { key: 'odometer', label: 'Odometer (km)', accessor: 'odometer', render: row => row.odometer.toLocaleString() },
        { key: 'region', label: 'Region', accessor: 'region' },
        { key: 'status', label: 'Status', accessor: 'status', render: row => <StatusPill status={row.status} /> },
        {
            key: 'actions', label: 'Actions', sortable: false, render: row => (
                <div className="action-btns">
                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); openEdit(row); }} title="Edit"><Edit size={15} /></button>
                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); toggleRetire(row); }} title={row.status === 'Retired' ? 'Reactivate' : 'Retire'}><Power size={15} /></button>
                    <button className="btn-icon btn-danger" onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DELETE_VEHICLE', payload: row.id }); }} title="Delete"><Trash2 size={15} /></button>
                </div>
            )
        },
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Vehicle Registry</h1>
                    <p>Manage fleet assets and their status</p>
                </div>
                <button className="btn-primary" onClick={openAdd}><Plus size={18} /> Add Vehicle</button>
            </div>

            <DataTable columns={columns} data={state.vehicles} pageSize={10} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Vehicle' : 'Add Vehicle'}>
                <form onSubmit={handleSave} className="modal-form">
                    <div className="form-row">
                        <div className="form-group"><label>Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Truck-01" required /></div>
                        <div className="form-group"><label>Model</label><input value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} placeholder="e.g. Tata 407" required /></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><label>License Plate</label><input value={form.licensePlate} onChange={e => setForm({ ...form, licensePlate: e.target.value })} placeholder="MH-12-AB-1234" required /></div>
                        <div className="form-group"><label>Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Truck</option><option>Van</option><option>Bike</option></select></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><label>Max Capacity (kg)</label><input type="number" value={form.maxCapacity} onChange={e => setForm({ ...form, maxCapacity: e.target.value })} required /></div>
                        <div className="form-group"><label>Odometer (km)</label><input type="number" value={form.odometer} onChange={e => setForm({ ...form, odometer: e.target.value })} required /></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><label>Region</label><select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })}><option>North</option><option>South</option><option>East</option><option>West</option></select></div>
                        <div className="form-group"><label>Acquisition Cost (₹)</label><input type="number" value={form.acquisitionCost} onChange={e => setForm({ ...form, acquisitionCost: e.target.value })} /></div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn-primary">{editing ? 'Save Changes' : 'Add Vehicle'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
