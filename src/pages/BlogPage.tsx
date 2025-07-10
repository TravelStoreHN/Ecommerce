import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FACEBOOK_PROFILE_URL, SITE_NAME } from '../constants';
import { ArrowRightIcon, CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';


interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const { language } = useSettings();
  const t = (key: string) => language === 'es' ? ({readMore: "Leer Más"})[key] as string : ({readMore: "Read More"})[key] as string;
  
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden group">
      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
            <span className="flex items-center"><CalendarDaysIcon className="h-4 w-4 mr-1" /> {new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
            <span className="flex items-center"><UserIcon className="h-4 w-4 mr-1" /> {post.author}</span>
          </div>
          <Link to={`/shop/blog/${post.slug}`} className="block">
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors mb-2">{post.title}</h2>
          </Link>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div>
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <Link to={`/shop/blog/${post.slug}`} className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
              {t('readMore')} <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};


const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const { language } = useSettings();

  const t = (key: string): string => {
    const translations: Record<string, Record<string, string | ((siteName: string) => string)>> = {
      es: {
        title: `Blog de ${SITE_NAME}`,
        subtitle: "¡Inspírate! Consejos, guías e historias para tu próxima aventura en Honduras y más allá.",
        noPosts: "Aún no hay entradas en el blog.",
        noPostsAdvice: "¡Vuelve pronto para consejos de viaje e historias!",
        connectWithUs: "¡Conéctate con Nosotros!",
        connectPrompt: (siteName: string) => `Sigue a ${siteName} en redes sociales para las últimas actualizaciones, inspiración de viajes y ofertas especiales.`,
        followFacebook: () => `Síguenos en Facebook @TravelStoreHN`
      },
      en: {
        title: `${SITE_NAME} Blog`,
        subtitle: "Get inspired! Tips, guides, and stories for your next adventure in Honduras and beyond.",
        noPosts: "No blog posts yet.",
        noPostsAdvice: "Check back soon for travel tips and stories!",
        connectWithUs: "Connect With Us!",
        connectPrompt: (siteName: string) => `Follow ${siteName} on social media for the latest updates, travel inspiration, and special offers.`,
        followFacebook: () => `Follow us on Facebook @TravelStoreHN`
      }
    };
    
    const translationEntry = translations[language === 'es' ? 'es' : 'en'][key];

    if (typeof translationEntry === 'function') {
      // Pass SITE_NAME only if the function expects it (e.g., connectPrompt)
      // For followFacebook, we call it without arguments as it's now hardcoded.
      return key === 'connectPrompt' ? translationEntry(SITE_NAME) : (translationEntry as () => string)();
    }
    return translationEntry as string; // entry is string here
  };

  return (
    <div className="space-y-10">
      <header className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-3">{t('title')}</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">{t('noPosts')}</h2>
          <p className="text-gray-600">{t('noPostsAdvice')}</p>
        </div>
      )}



      <Card className="p-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">{t('connectWithUs')}</h3>
        <p className="text-gray-600 mb-6">
          {t('connectPrompt')}
        </p>
        <a href={FACEBOOK_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="lg">
            {t('followFacebook')}
          </Button>
        </a>
      </Card>
    </div>
  );
};

export default BlogPage;