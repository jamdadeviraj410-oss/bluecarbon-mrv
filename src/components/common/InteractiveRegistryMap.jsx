import { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function InteractiveRegistryMap({
  projects = [],
  selectedProject,
  onSelectProject,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center: Central Indian coastline
      const map = L.map(mapContainerRef.current, {
        center: [16.5, 76.0],
        zoom: 5,
        minZoom: 3,
        maxZoom: 18,
        zoomControl: false,
      });

      // Standard OSM Tile Layer with high-contrast styling
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | NCCR BlueCarbon',
        maxZoom: 19,
      }).addTo(map);

      // Custom Zoom Control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Create markers layer group
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when projects or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds = [];

    projects.forEach((proj) => {
      const lat = Number(proj.lat || proj.latitude || proj.coordinates?.lat);
      const lng = Number(proj.lng || proj.longitude || proj.coordinates?.lng);

      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

      bounds.push([lat, lng]);

      const isSelected = selectedProject?.id === proj.id;
      const isVerified = proj.statusCategory === 'verified' || proj.status === 'Verified' || proj.status === 'Active';

      const markerColor = isVerified ? '#1b6d24' : '#00abc1';
      const pulseHtml = isVerified
        ? `<div style="position:absolute;inset:-6px;border-radius:9999px;background-color:${markerColor};opacity:0.4;animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>`
        : '';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            ${pulseHtml}
            <div style="width:16px;height:16px;border-radius:9999px;background-color:${markerColor};border:3px solid #ffffff;box-shadow:0 4px 10px rgba(0,0,0,0.35);transform:${isSelected ? 'scale(1.3)' : 'scale(1)'};transition:transform 0.2s ease;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.on('click', () => {
        if (onSelectProject) {
          onSelectProject(proj);
        }
        map.panTo([lat, lng], { animate: true, duration: 0.5 });
      });

      // Bind popup
      const popupContent = `
        <div style="font-family:inherit;min-width:180px;padding:2px 0;">
          <div style="font-size:11px;font-weight:700;color:#001e40;margin-bottom:2px;">${proj.name}</div>
          <div style="font-size:10px;color:#43474f;margin-bottom:4px;">${proj.location || proj.state || ''}</div>
          <div style="font-size:11px;font-weight:700;color:${markerColor};">${proj.totalSequestered ? proj.totalSequestered + ' tCO2e' : (proj.est_co2e || '14,200') + ' tCO2e'}</div>
        </div>
      `;
      marker.bindPopup(popupContent);

      markersLayer.addLayer(marker);
    });

    // Auto-fit bounds if markers exist
    if (bounds.length > 0 && bounds.length <= 10) {
      try {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
      } catch {
        // Safe fallback
      }
    }
  }, [projects, selectedProject, onSelectProject]);

  return (
    <div className="w-full h-full relative z-0 min-h-[500px]">
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0 rounded-2xl" />
      <style>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          background-color: #cbdbf5;
        }
        .custom-leaflet-marker {
          background: transparent;
          border: none;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
