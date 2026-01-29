export const db = {
  patients: [
    { id: 1, name: "Suzy", dob: "1991-06-11", age: 35, mrn: "MRN1001" },
    { id: 2, name: "Sandra", dob: "1997-02-02", age: 29, mrn: "MRN1002" }
  ],
  visits: [
    { id: 1, patientsId: 1, date: "2026-01-20", reason: "Follow-up" }
    
  ],
  notes: [
    { id: 1, patientsId: 1, text: "Patient improving, continue plan." }

  ]
};

export function getNextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
}
