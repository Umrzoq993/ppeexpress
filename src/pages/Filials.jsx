import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/filials.scss";
import { MapPin } from "lucide-react"; // Region uchun
import { FaGoogle, FaYandex } from "react-icons/fa"; // Linklar uchun

export default function Filials() {
  const [regions, setRegions] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedRegionName, setSelectedRegionName] = useState("");
  const [flials, setFlials] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [loadingFlials, setLoadingFlials] = useState(false);

  const getRegions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/regions/`
      );
      setRegions(response.data);
    } catch (error) {
      console.error("Regionlarni olishda xato:", error);
    } finally {
      setLoadingRegions(false);
    }
  };

  const getFlials = async (regionId, regionName) => {
    setLoadingFlials(true);
    try {
      const response = await axios.get(`
        ${process.env.REACT_APP_API_URL}/flials/?region_id=${regionId}`);
      setFlials(response.data);
      setSelectedRegionId(regionId);
      setSelectedRegionName(regionName);
    } catch (error) {
      console.error("Filiallarni olishda xato:", error);
      setFlials([]);
    } finally {
      setLoadingFlials(false);
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  return (
    <div className="filials">
      <h2>📍 Hududlar ro‘yxati</h2>

      {loadingRegions ? (
        <p>Regionlar yuklanmoqda...</p>
      ) : (
        <div className="region-list">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`region-card ${
                region.id === selectedRegionId ? "active" : ""
              }`}
              onClick={() => getFlials(region.id, region.name)}
            >
              <MapPin size={18} style={{ marginRight: "5px" }} />
              {region.name}
            </div>
          ))}
        </div>
      )}

      {selectedRegionId && (
        <>
          <h3>📌 {`${selectedRegionName} filiallari`}</h3>
          {loadingFlials ? (
            <p>Filiallar yuklanmoqda...</p>
          ) : flials.length === 0 ? (
            <p>Filiallar topilmadi.</p>
          ) : (
            <div className="flials-list">
              {flials.map((flial) => (
                <div key={flial.flial_id} className="flial-card">
                  <h4>
                    <MapPin size={16} style={{ marginRight: "4px" }} />
                    {flial.flial}
                  </h4>
                  <p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${flial.latitude},${flial.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGoogle size={14} color="#4285F4" /> Google
                    </a>{" "}
                    |{" "}
                    <a
                      href={`https://yandex.com/maps/?pt=${flial.longitude},${flial.latitude}&z=16&l=map`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYandex size={14} color="#FF0000" /> Yandex
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
