// components/Navbar.js
import Link from 'next/link';
const Navbar = ({path}: {path: string}) => {
  const getStyle = (urlPath: string) => {
    return path.includes(urlPath) ? 'text-black underline' : 'text-gray-500'
  }

  return (
    <nav className="bg-transparent py-2 absolute top-40 w-full flex justify-center text-xl">
      <Link href="/" className={`mr-6 font-bold ${getStyle('Encode')} hover:text-black `}>
        Encode
      </Link>
      <Link href="/decode" className={`font-bold ${getStyle('Decode')} hover:text-black`}>
        Decode
      </Link>
    </nav>
  );
};

export default Navbar;
