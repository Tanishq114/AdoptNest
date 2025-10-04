import React, { useState } from 'react';

const items = [
  { q: 'How do I adopt a pet?', a: 'Create an account, browse pets, submit an adoption request, and coordinate with the owner or shelter.' },
  { q: 'Is there an adoption fee?', a: 'Fees vary by owner/shelter. We encourage transparent costs that cover basic care and vaccinations.' },
  { q: 'Can I list a pet for adoption?', a: 'Yes. Go to Add Pet, fill the form with accurate details, and upload photos. Listings are reviewed.' },
  { q: 'Do you verify listings?', a: 'We use a mix of automated and manual checks. Users can report suspicious listings for immediate review.' }
];

function FAQAccordion({ data = items }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {data.map((it, idx) => (
        <div key={it.q} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', marginBottom: '10px', overflow: 'hidden' }}>
          <button onClick={()=>setOpen(open===idx? -1 : idx)} style={{ width: '100%', textAlign: 'left', background: '#f9fafb', padding: '14px 16px', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>{it.q}</span>
            <span>{open===idx ? '−' : '+'}</span>
          </button>
          {open===idx && (
            <div style={{ padding: '14px 16px', background: 'white', color: '#444' }}>{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;


