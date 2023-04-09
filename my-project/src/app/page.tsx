
import Link from 'next/link';
import Image from 'next/image';

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/aktq9vvjkxu5/entries?access_token=JpDhyTdHDUhtu9A5Rkn2l-kbxIs61j4NBWHKH4enX7I&content_type=vehicle`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <>
     <div className='mb-5 flex items-center justify-between px-10 py-5'>
      <Link href='.' className='text-2xl font-semibold text-gray-700'>
        Blogs
      </Link>
    </div>
    <div className='mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-8 p-8'>
      {blogs.items.map((blog: any) => {
     let coverImageUrl = blogs.includes.Asset.find(
      (obj: { sys: { id: any } }) =>
        obj.sys.id === blog.fields.vehicleImage.sys.id
    )?.fields.file.url;
    return (
      <div key={blog.sys.id} className='rounded-lg bg-white'>
        <Image
          src={'https:' + coverImageUrl}
          alt=''
          width='500'
          height='500'
          className='h-96 w-full rounded-t-lg bg-gradient-to-br from-[#FFEAF6] via-[#E1E1DF] to-[#9C7FC7] object-cover'
          priority
        />
        <div className='p-6'>
          <h2 className='text-2xl font-bold'>{blog.fields.vehicleName}</h2>
          <p className='mb-3; mt-4 text-justify'>{blog.fields.engineType}</p>
        </div>
      </div>
    );
  })}
</div>
</>
  );
}
