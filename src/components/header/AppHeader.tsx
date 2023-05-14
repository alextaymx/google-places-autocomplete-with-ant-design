import { SmileFilled } from '@ant-design/icons';
import Link from 'next/link';

type Props = {};

function AppHeader(props: Props) {
  return (
    <div className='text-center mb-5'>
      <Link href='#' className='logo mr-0'>
        <SmileFilled style={{ fontSize: 48 }} />
      </Link>

      <p className='mb-0 mt-3 text-disabled'>Welcome to this demo !</p>
    </div>
  );
}

export default AppHeader;
