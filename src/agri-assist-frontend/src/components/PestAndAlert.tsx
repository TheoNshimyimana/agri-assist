import React from "react";
import {  Bug, Sprout, ShieldAlert, SprayCan } from "lucide-react";

interface PestDisease {
  name: string;
  type: "pest" | "disease";
  severity: "low" | "medium" | "high";
  description: string;
  prevention: string[];
  treatment: string[];
  seasonality: string[];
}

const pestAndDiseasesData: PestDisease[] = [
  {
    name: "Aphids",
    type: "pest",
    severity: "medium",
    description: "Sap-sucking insects causing leaf curl and stunted growth",
    prevention: [
      "Introduce ladybugs as natural predators",
      "Apply neem oil every 2 weeks",
      "Use reflective mulches",
    ],
    treatment: [
      "Spray insecticidal soap (2 tbsp/gal)",
      "Apply pyrethrin-based insecticides",
      "Prune heavily infested areas",
    ],
    seasonality: ["Spring", "Early Summer"],
  },
  {
    name: "Powdery Mildew",
    type: "disease",
    severity: "high",
    description: "Fungal infection showing white powdery leaf coating",
    prevention: [
      "Maintain 50-70% humidity",
      "Ensure 6hr+ daily sunlight",
      'Space plants 18-24" apart',
    ],
    treatment: [
      "Apply potassium bicarbonate solution",
      "Use sulfur-based fungicides",
      "Remove infected leaves immediately",
    ],
    seasonality: ["Humid Seasons", "Fall"],
  },
  {
    name: "Tomato Blight",
    type: "disease",
    severity: "high",
    description: "Rapid fungal disease causing leaf spot and fruit rot",
    prevention: [
      "Rotate crops annually",
      "Use drip irrigation systems",
      "Select blight-resistant varieties",
    ],
    treatment: [
      "Apply copper fungicide weekly",
      "Destroy infected plants",
      "Solarize soil post-harvest",
    ],
    seasonality: ["Rainy Seasons", "Summer"],
  },
];

const PestAndAlert: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-green-600 tracking-tight">
              Integrated Pest Management Guide
            </h1>
            <Bug className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Learn about science-based crop protection strategies with detailed
            prevention and treatment protocols.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {pestAndDiseasesData.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div
                className={`p-5 border-b ${
                  item.type === "pest" ? "bg-amber-50" : "bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      item.type === "pest" ? "bg-amber-100" : "bg-blue-100"
                    }`}
                  >
                    {item.type === "pest" ? (
                      <Bug className="w-6 h-6 text-amber-600" />
                    ) : (
                      <ShieldAlert className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <span
                    className={`ml-auto px-4 py-1 rounded-full text-sm font-medium ${
                      item.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : item.severity === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Seasonality */}
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    Active Seasons
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {item.seasonality.map((season, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 text-sm"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prevention & Treatment Columns */}
                <div className="grid gap-8">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                      <ShieldAlert className="w-4 h-4" />
                      Prevention Protocol
                    </h3>
                    <ul className="space-y-2 pl-4">
                      {item.prevention.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start before:content-['·'] before:text-emerald-600 before:mr-3 before:font-bold text-gray-600 text-sm"
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-rose-600 uppercase tracking-wide">
                      <SprayCan className="w-4 h-4" />
                      Treatment Plan
                    </h3>
                    <ul className="space-y-2 pl-4">
                      {item.treatment.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start before:content-['·'] before:text-rose-500 before:mr-3 before:font-bold text-gray-600 text-sm"
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestAndAlert;
