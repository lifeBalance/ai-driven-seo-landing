export default function Button(props: React.PropsWithChildren) {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190b2e] to-[#4a2081] shadow-[0px_0px_12px_#8c45ff]">
      <div className="absolute inset-0">
        <div className="absolute border rounded-lg border-white/20 inset-0 [map-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="absolute border rounded-lg border-white/40 inset-0 [map-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute rounded-lg inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset]"></div>
      </div>

      <span>{props.children}</span>
    </button>
  )
}
