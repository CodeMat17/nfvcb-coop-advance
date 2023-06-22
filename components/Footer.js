import Link from 'next/link'


const Footer = () => {
    return (
      <div className='bg-gray-700 py-6 text-center'>
        <p>&copy; COOP Advance 2023, All rights reserved.</p>
        <p className='text-gray-500'>
          Developed by{" "}
          <a
            href='https://www.soft-lutions.com.ng'
            target='_blank'
            className='text-blue-500 text-sm '>
            Soft-lutions
          </a>{" "}
        </p>
        <Link href='https://www.soft-lutions.com.ng' target='_blank'>
          {" "}
          Soft-lutions
        </Link>
      </div>
    );
}

export default Footer;