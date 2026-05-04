"use client";

import { useState, useEffect } from "react";

type AMPM = "AM" | "PM";

interface TimeState {
  h: number | null;
  m: number | null;
  ap: AMPM;
}

export interface TimeRangeValue {
  start: string;
  end: string;
}

interface TimeRangePickerProps {
  value?: TimeRangeValue;
  onChange?: (value: TimeRangeValue) => void;
  label?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const pad = (n: number) => String(n).padStart(2, "0");

const T = {
  black: "#111111",
  white: "#ffffff",
  bg: "#f5f5f5",
  border: "#dddddd",
  muted: "#888888",
  disabled: "#dddddd",
};

function parseSQLTime(timeStr: string | undefined, defaultAP: AMPM): TimeState {
  if (!timeStr || timeStr === "") return { h: null, m: null, ap: defaultAP };
  const [hh, mm] = timeStr.split(":").map(Number);
  const ap = hh >= 12 ? "PM" : "AM";
  const h = hh % 12 || 12;
  return { h, m: mm, ap };
}

function toSQLTime(t: TimeState): string {
  if (t.h === null || t.m === null) return "00:00:00";
  let hh = t.h % 12;
  if (t.ap === "PM") hh += 12;
  if (t.ap === "AM" && hh === 12) hh = 0;
  return `${pad(hh)}:${pad(t.m)}:00`;
}

export function TimeRangePicker({ value, onChange, label = "Horario del evento" }: TimeRangePickerProps) {
  const [start, setStart] = useState<TimeState>(() => parseSQLTime(value?.start, "AM"));
  const [end, setEnd] = useState<TimeState>(() => parseSQLTime(value?.end, "PM"));
  const [active, setActive] = useState<"start" | "end" | null>(null);

  useEffect(() => {
    if (value) {
      setStart(parseSQLTime(value.start, "AM"));
      setEnd(parseSQLTime(value.end, "PM"));
    }
  }, [value]);

  // Esta función es la que saca el string limpio hacia el formulario
  const triggerUpdate = (newStart: TimeState, newEnd: TimeState) => {
    onChange?.({
      start: toSQLTime(newStart),
      end: toSQLTime(newEnd),
    });
  };

  const updateStart = (patch: Partial<TimeState>) => {
    const next = { ...start, ...patch };
    setStart(next);
    triggerUpdate(next, end);
  };

  const updateEnd = (patch: Partial<TimeState>) => {
    const next = { ...end, ...patch };
    setEnd(next);
    triggerUpdate(start, next);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minWidth: 0 }}>
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: T.black, margin: "0 0 14px" }}>{label}</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5px 1fr", border: `1.5px solid ${T.black}`, borderRadius: 10, overflow: "hidden" }}>
        <button type="button" onClick={() => setActive(active === "start" ? null : "start")} style={{ padding: "16px", background: active === "start" ? T.black : T.white, color: active === "start" ? T.white : T.black, border: "none", textAlign: "left", cursor: "pointer" }}>
          <span style={{ fontSize: 9, fontWeight: 700, display: "block", color: active === "start" ? "#aaa" : T.muted }}>INICIO</span>
          <span style={{ fontSize: 24, fontWeight: 600, fontFamily: "monospace" }}>{start.h ? `${pad(start.h)}:${pad(start.m || 0)}` : "--:--"}</span>
          <span style={{ fontSize: 11, marginLeft: 4 }}>{start.ap}</span>
        </button>

        <div style={{ background: T.black }} />

        <button type="button" onClick={() => setActive(active === "end" ? null : "end")} style={{ padding: "16px", background: active === "end" ? T.black : T.white, color: active === "end" ? T.white : T.black, border: "none", textAlign: "left", cursor: "pointer" }}>
          <span style={{ fontSize: 9, fontWeight: 700, display: "block", color: active === "end" ? "#aaa" : T.muted }}>CIERRE</span>
          <span style={{ fontSize: 24, fontWeight: 600, fontFamily: "monospace" }}>{end.h ? `${pad(end.h)}:${pad(end.m || 0)}` : "--:--"}</span>
          <span style={{ fontSize: 11, marginLeft: 4 }}>{end.ap}</span>
        </button>
      </div>

      {active && (
        <div style={{ marginTop: 10, background: T.white, border: `2px solid ${T.black}`, borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>HORA</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
                {HOURS.map(h => (
                  <button key={h} type="button" onClick={() => active === "start" ? updateStart({ h }) : updateEnd({ h })} style={{ padding: "8px 0", borderRadius: 4, background: (active === "start" ? start.h : end.h) === h ? T.black : T.bg, color: (active === "start" ? start.h : end.h) === h ? T.white : T.black, border: "none", cursor: "pointer", fontSize: 12 }}>{pad(h)}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>MINUTOS</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
                {MINUTES.map(m => (
                  <button key={m} type="button" onClick={() => active === "start" ? updateStart({ m }) : updateEnd({ m })} style={{ padding: "8px 0", borderRadius: 4, background: (active === "start" ? start.m : end.m) === m ? T.black : T.bg, color: (active === "start" ? start.m : end.m) === m ? T.white : T.black, border: "none", cursor: "pointer", fontSize: 12 }}>{pad(m)}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 18 }}>
              {["AM", "PM"].map(ap => (
                <button key={ap} type="button" onClick={() => active === "start" ? updateStart({ ap: ap as AMPM }) : updateEnd({ ap: ap as AMPM })} style={{ padding: "10px 12px", borderRadius: 6, border: `1.5px solid ${T.black}`, background: (active === "start" ? start.ap : end.ap) === ap ? T.black : T.white, color: (active === "start" ? start.ap : end.ap) === ap ? T.white : T.black, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>{ap}</button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => setActive(null)} style={{ marginTop: 15, width: "100%", padding: "10px", background: T.black, color: T.white, borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer" }}>CONFIRMAR</button>
        </div>
      )}
    </div>
  );
}