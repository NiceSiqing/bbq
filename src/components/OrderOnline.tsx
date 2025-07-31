import { Link } from "react-router-dom";
export default function OrderOnline() {
    return (
        <div className="w-full h-15 flex items-center justify-center bg-red-600 text-white font-black text-xl"
          style={{
            textShadow: '0.4px 0 0 currentColor, -0.4px 0 0 currentColor, 0 0.4px 0 currentColor, 0 -0.4px 0 currentColor',
            boxShadow: '0 16px 16px rgba(0, 0, 0, 0.4)',
        }}>
            <Link to="/name">ORDER ONLINE</Link>
        </div>
    )
}