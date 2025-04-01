import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Bug, Leaf, Thermometer } from 'lucide-react';

interface PestDiseaseAlert {
  id: string;
  type: 'pest' | 'disease';
  name: string;
  scientificName: string;
  description: string;
  prevention: string[];
  treatment: string[];
  severity: 'low' | 'medium' | 'high';
  temperatureRange: string;
  humidityRange: string;
  affectedCrops: string[];
  affectedRegions: string[];
  lifecycle: string[];
}

const agriculturalAlerts: PestDiseaseAlert[] = [
  {
    id: 'tomato-lb',
    type: 'disease',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    description: 'Devastating oomycete causing rapid plant destruction. Spreads through water-splashed spores.',
    prevention: [
      'Use certified disease-free seeds',
      'Implement drip irrigation',
      'Apply chlorothalonil (Bravo) preventatively',
      'Destroy crop residues post-harvest'
    ],
    treatment: [
      'Immediate application of mancozeb (2.5g/L)',
      'Remove and burn infected plants',
      '7-day fungicide rotation protocol'
    ],
    severity: 'high',
    temperatureRange: '15-25°C',
    humidityRange: '>90% RH',
    affectedCrops: ['Tomato', 'Potato'],
    affectedRegions: ['Northern Province', 'Kigali'],
    lifecycle: ['Spore germination (4h)', 'Leaf penetration (24h)', 'Sporulation (3-5 days)']
  },
  {
    id: 'faw',
    type: 'pest',
    name: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    description: 'Polyphagous lepidopteran pest with 8-9 annual generations. Causes 20-50% yield loss.',
    prevention: [
      'Early planting with monitoring',
      'Pheromone traps (15/ha density)',
      'Intercropping with repellent plants (e.g., Desmodium)',
      'Conserve natural enemies (e.g., Trichogramma)'
    ],
    treatment: [
      'Biological: Bacillus thuringiensis var. kurstaki (500g/ha)',
      'Chemical: Chlorantraniliprole (15ml/15L)',
      'Mechanical: Hand-pick egg masses'
    ],
    severity: 'medium',
    temperatureRange: '20-30°C',
    humidityRange: '50-80% RH',
    affectedCrops: ['Maize', 'Sorghum'],
    affectedRegions: ['Eastern Province', 'Southern Province'],
    lifecycle: ['Egg (2-3d)', 'Larva (14-22d)', 'Pupa (8-9d)', 'Adult (10-21d)']
  },
  // Additional 5 real-world entries...
];

const PestDiseaseAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<PestDiseaseAlert[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedRegion, setSelectedRegion] = useState('Kigali');
  const [severityFilter, setSeverityFilter] = useState<'' | PestDiseaseAlert['severity']>('');

  const filterAlerts = useCallback(() => {
    return agriculturalAlerts.filter(alert => 
      alert.affectedCrops.some(c => c.toLowerCase() === selectedCrop.toLowerCase()) &&
      alert.affectedRegions.some(r => r.toLowerCase() === selectedRegion.toLowerCase()) &&
      (!severityFilter || alert.severity === severityFilter)
    );
  }, [selectedCrop, selectedRegion, severityFilter]);

  useEffect(() => {
    setAlerts(filterAlerts());
  }, [filterAlerts]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center gap-4">
        <Leaf className="text-green-600 w-8 h-8" />
        <h1 className="text-2xl font-semibold text-gray-800">Agricultural Threat Management System</h1>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            {Array.from(new Set(agriculturalAlerts.flatMap(a => a.affectedCrops))).map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {Array.from(new Set(agriculturalAlerts.flatMap(a => a.affectedRegions))).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as typeof severityFilter)}
          >
            <option value="">All Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Alert Dashboard */}
      <div className="space-y-6">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${
                alert.type === 'pest' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                {alert.type === 'pest' ? (
                  <Bug className="w-6 h-6 text-orange-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">{alert.name}</h2>
                  <span className="text-sm text-gray-500 italic">{alert.scientificName}</span>
                  <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{alert.description}</p>
              </div>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Optimal Conditions</div>
                <div className="mt-1 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-600" />
                  <span>{alert.temperatureRange}</span>
                </div>
                <div className="text-sm">Humidity: {alert.humidityRange}</div>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Lifecycle Stages</div>
                <div className="mt-1 space-y-1">
                  {alert.lifecycle.map((stage, i) => (
                    <div key={i} className="text-sm text-gray-700">• {stage}</div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Prevention Strategies</div>
                <div className="mt-1 space-y-1">
                  {alert.prevention.map((strategy, i) => (
                    <div key={i} className="text-sm text-gray-700">✓ {strategy}</div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Treatment Protocols</div>
                <div className="mt-1 space-y-1">
                  {alert.treatment.map((protocol, i) => (
                    <div key={i} className="text-sm text-gray-700">⚕️ {protocol}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PestDiseaseAlerts;