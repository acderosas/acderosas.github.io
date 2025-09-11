import Image from 'next/image'
import Link from 'next/link'
import signature from '../../public/signature.png'

export default function GradientHeader() {
    return (
        <div id = "gradientheader" role = "banner">
            <Link href = "/">
                <Image 
                    src = {signature}
                    alt = "E-sign"
                    width =  {100}
                    height = {30}
                    placeholder= "empty" // Only works if imported
                    priority style={{ height: "auto", width: "auto" }}
                />
            </Link>
        </div>
    )
}
        
