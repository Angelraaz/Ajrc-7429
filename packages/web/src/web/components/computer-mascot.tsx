type ComputerMascotProps = { happy: boolean };

/** Mascota decorativa: la etiqueta accesible pertenece al botón del asistente. */
export function ComputerMascot({ happy }: ComputerMascotProps) {
  return <svg className={`computer-mascot ${happy ? 'is-happy' : 'is-angry'}`} data-mood={happy ? 'happy' : 'angry'} viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
    <path d="M31 60h18l3 10H28l3-10Z" fill="#7da7b2" stroke="#091e32" strokeWidth="3" />
    <rect x="19" y="69" width="42" height="6" rx="3" fill="#d4e8ec" stroke="#091e32" strokeWidth="3" />
    <rect x="5" y="7" width="70" height="55" rx="12" fill="#d4e8ec" stroke="#091e32" strokeWidth="3" />
    <rect x="11" y="13" width="58" height="39" rx="7" fill="#091e32" />
    <path d="M16 23v-4a2 2 0 0 1 2-2h7" stroke="#32566a" strokeWidth="2" strokeLinecap="round" />
    {happy ? <g stroke="#64e2c0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 31q5-8 10 0M47 31q5-8 10 0" />
      <path d="M30 38q10 13 20 0" fill="#64e2c0" />
    </g> : <g stroke="#64e2c0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m23 24 11 5m12 0 11-5" />
      <path d="M28 32v2m24-2v2M31 43q9-9 18 0" />
    </g>}
    <ellipse cx="21" cy="38" rx="4" ry="2" fill={happy ? '#ffaea1' : '#64e2c0'} opacity=".65" />
    <ellipse cx="59" cy="38" rx="4" ry="2" fill={happy ? '#ffaea1' : '#64e2c0'} opacity=".65" />
    <circle cx="62" cy="57" r="2" fill="#269a78" />
    <path d="M34 57h12" stroke="#7da7b2" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}
