'use client';
import { useContentContext } from '@/context/ContentContext';

export default function SocialFeed() {
  const { social } = useContentContext();
  if (!social.length) return null;
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">From our Socials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {social.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            {item.type === 'youtube' ? (
              <iframe
                className="w-full h-60"
                src={`https://www.youtube.com/embed/${extractYouTubeId(item.url)}?autoplay=0&mute=1`}
                title={item.title || 'YouTube video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <a href={item.url} target="_blank" rel="noreferrer">
                <img src={item.thumb || placeholderFor(item.type)} className="w-full h-60 object-cover" />
              </a>
            )}
            <div className="p-4">
              <div className="font-semibold mb-1 capitalize">{item.type}</div>
              {item.title && <div className="text-sm text-gray-600">{item.title}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function extractYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.substring(1);
    const id = u.searchParams.get('v');
    return id || '';
  } catch {
    return '';
  }
}

function placeholderFor(type: string) {
  if (type === 'facebook') return 'https://dummyimage.com/640x360/111/fff&text=Facebook+Post';
  if (type === 'instagram') return 'https://dummyimage.com/640x360/222/fff&text=Instagram+Post';
  return 'https://dummyimage.com/640x360/000/fff&text=Social';
}
