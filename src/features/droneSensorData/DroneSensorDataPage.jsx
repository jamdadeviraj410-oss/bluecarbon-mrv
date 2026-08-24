import { useState } from 'react';
import { SensorRegistryView } from '../sensors';
import { DroneBeforeAfterView } from '../drone';

export default function DroneSensorDataPage() {
  const [activeTab, setActiveTab] = useState('drone'); // 'drone' | 'sensors' | 'overview'

  return (
    <div className="flex flex-col w-full px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-data font-bold bg-primary-container text-on-primary-container uppercase tracking-wider">
              Telemetry & Remote Sensing
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-data bg-secondary-container text-on-secondary-container">
              PRJ-2023-089
            </span>
          </div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-on-surface">
            Drone & Sensor Data
          </h1>
          <p className="font-body-lg text-on-surface-variant text-sm mt-0.5">
            High-resolution drone orthomosaics, NDVI vegetation analysis, and multi-parameter IoT sensor telemetry
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-surface-container rounded-xl p-1 border border-outline-variant/40 shadow-sm">
          <button
            onClick={() => setActiveTab('drone')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-title-md font-bold transition-all cursor-pointer ${
              activeTab === 'drone'
                ? 'bg-surface shadow-sm text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">flight</span>
            <span>Drone Surveys & NDVI</span>
          </button>
          <button
            onClick={() => setActiveTab('sensors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-title-md font-bold transition-all cursor-pointer ${
              activeTab === 'sensors'
                ? 'bg-surface shadow-sm text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">sensors</span>
            <span>IoT Sensor Telemetry</span>
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <div className="w-full">
        {activeTab === 'drone' && (
          <div className="space-y-6 animate-fade-in">
            <DroneBeforeAfterView />
          </div>
        )}

        {activeTab === 'sensors' && (
          <div className="space-y-6 animate-fade-in">
            <SensorRegistryView projectId="PRJ-2023-089" />
          </div>
        )}
      </div>
    </div>
  );
}
