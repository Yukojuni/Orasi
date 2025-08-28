"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

interface Props {
  params: { id: string };
}

interface Event {
  id: string;
  titre: string;
  description: string | null;
  date: string;
  lien_image: string | null;
}

export default function EventPage({ params }: Props) {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("evenements")
        .select(`
          id,
          titre,
          description,
          date,
          lien_image
        `)
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Événement non trouvé.");
      } else {
        setEvent(data);
      }

      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-600 text-lg uppercase">Chargement de l'événement...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-red-600 text-lg uppercase">{error}</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto p-8 flex-grow">
        {event.lien_image && (
          <img
            src={event.lien_image}
            alt={event.titre}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold mb-4 uppercase">{event.titre}</h1>

        <div className="flex items-center space-x-4 mb-8 text-sm text-gray-600 uppercase">
          <span>Date : {new Date(event.date).toLocaleDateString("fr-FR")}</span>
        </div>

        <article className="prose max-w-none text-gray-800 whitespace-pre-line">
          {event.description}
        </article>
      </main>

      <Footer />
    </div>
  );
}
