import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin } from "lucide-react";
import { FaGoogle, FaYandex } from "react-icons/fa";
import "../style/filialpage.scss";

export default function FilialPage() {
  const { flial_id } = useParams();
  const [flial, setFlial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8001/flial/?flial_id=${flial_id}")
      .then((res) => setFlial(res.data))
      .catch(() => setFlial(null))
      .finally(() => setLoading(false));
  }, [flial_id]);

  if (loading)
    return (
      <div className="filial-page">
        <p>Ma’lumotlar yuklanmoqda...</p>
      </div>
    );
  if (!flial)
    return (
      <div className="filial-page">
        <p>Filial topilmadi yoki mavjud emas.</p>
      </div>
    );

  return (
    <div className="filial-page">
      <h2>
        <MapPin size={22} style={{ marginRight: "8px" }} />
        Yuk olish manzilingiz
      </h2>
      <div className="filial-card">
        <h3>{flial.flial}</h3>
        <div className="coords">
          📍 Lat: {flial.latitude} | Lng: {flial.longitude}
        </div>
        <div className="maps-links">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${flial.latitude},${flial.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGoogle size={16} /> Google Maps
          </a>
          <a
            href={`https://yandex.com/maps/?pt=${flial.longitude},${flial.latitude}&z=16&l=map`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYandex size={16} /> Yandex Maps
          </a>
        </div>
      </div>
    </div>
  );
}
