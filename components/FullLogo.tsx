import Image from "next/image";
import Link from "next/link";

const FullLogo = () => {
  return (
    <Link className="flex flex-row gap-4 w-fit h-[3rem] mb-6" href="/">
      <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
      />

      <div className="text-24-bold mt-[6px] text-white hover:text-white/90">NextCare</div>
    </Link>
  );
};

export default FullLogo;
