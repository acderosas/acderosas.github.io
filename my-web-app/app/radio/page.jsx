import radioplay from "../../public/RDRadio.png";
import Image from "next/image";

export default function Radio() {
    return (
        <main>
            <Image
                      src={radioplay}
                      alt=""
                      fill
                      priority
                      className="object-contain z-0"
                      aria-hidden
                    />
        </main>
    )
}