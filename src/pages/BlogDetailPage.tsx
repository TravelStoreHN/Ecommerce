import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, UserIcon, CalendarIcon, TagIcon, ShareIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '../types';
import { useSettings } from '../contexts/SettingsContext';

// InDrive Widget Component
const InDriveWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tpwdgt.com/content?trs=195824&shmarker=393450&locale=en&powered_by=true&color_button=%23A7E92F&color_icons=%23A7E92F&dark=%23323942&light=%23FFFFFF&secondary=%23016A2B&special=%23a7e92f&color_focused=%23A7E92F&border_radius=30&plain=false&promo_id=8450&campaign_id=371';
    script.charset = 'utf-8';
    script.async = true;

    const container = document.getElementById('indrive-widget-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return <div id="indrive-widget-container" className="mt-8"></div>;
};

// Social sharing component
const SocialShareButtons: React.FC<{ post: BlogPost; currentUrl: string }> = ({ post, currentUrl }) => {
  const { language } = useSettings();
  
  const shareOnTwitter = () => {
    const text = `${post.title} - ${post.excerpt}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const text = `${post.title}\n\n${post.excerpt}\n\n${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have direct URL sharing, so we'll open their profile
    // Users can then share the link manually or save it to share as a story
    window.open('https://instagram.com/TravelStoreHN', '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    // You could add a toast notification here
  };

  return (
    <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
      <ShareIcon className="h-5 w-5 text-gray-500" />
      <span className="text-gray-700 font-medium">
        {language === 'es' ? 'Compartir:' : 'Share:'}
      </span>
      <button
        onClick={shareOnTwitter}
        className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        title="Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </button>
      <button
        onClick={shareOnFacebook}
        className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
        title="Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      <button
        onClick={shareOnWhatsApp}
        className="flex items-center justify-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        title="WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>
      <button
        onClick={shareOnInstagram}
        className="flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors"
        title="Instagram"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </button>
      <button
        onClick={copyLink}
        className="flex items-center justify-center p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        title={language === 'es' ? 'Copiar enlace' : 'Copy link'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

interface BlogDetailPageProps {
  posts: BlogPost[];
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ posts }) => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useSettings();
  
  const post = posts.find(p => p.slug === slug);
  const currentUrl = window.location.href;

  // Add meta tags for social media sharing
  useEffect(() => {
    if (post) {
      // Update page title
      document.title = `${post.title} - TravelStore HN`;
      
      // Remove existing dynamic meta tags
      const existingMeta = document.querySelectorAll('meta[data-dynamic="true"]');
      existingMeta.forEach(meta => meta.remove());

      // Create and add new meta tags
      const metaTags = [
        // Open Graph (Facebook)
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.excerpt },
        { property: 'og:image', content: post.imageUrl },
        { property: 'og:url', content: currentUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: 'TravelStore HN' },
        { property: 'article:author', content: post.author },
        { property: 'article:published_time', content: post.date },
        { property: 'article:section', content: post.category },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.excerpt },
        { name: 'twitter:image', content: post.imageUrl },
        { name: 'twitter:url', content: currentUrl },
        { name: 'twitter:site', content: '@TravelStoreHN' },
        { name: 'twitter:creator', content: '@TravelStoreHN' },
        
        // General meta tags
        { name: 'description', content: post.excerpt },
        { name: 'keywords', content: post.tags.join(', ') }
      ];

      metaTags.forEach(({ property, name, content }) => {
        // Check if meta tag already exists
        const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('data-dynamic', 'true');
          if (property) meta.setAttribute('property', property);
          if (name) meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
      });
    }

    // Cleanup function
    return () => {
      document.title = 'TravelStore HN';
    };
  }, [post, currentUrl]);

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        backToBlog: 'Volver al Blog',
        publishedOn: 'Publicado el',
        by: 'por',
        readTime: 'tiempo de lectura',
        tags: 'Etiquetas',
        relatedPosts: 'Artículos Relacionados',
        notFound: 'Artículo no encontrado',
        notFoundDesc: 'El artículo que buscas no existe o ha sido movido.',
      },
      en: {
        backToBlog: 'Back to Blog',
        publishedOn: 'Published on',
        by: 'by',
        readTime: 'read time',
        tags: 'Tags',
        relatedPosts: 'Related Posts',
        notFound: 'Article not found',
        notFoundDesc: 'The article you are looking for does not exist or has been moved.',
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('notFound')}</h1>
        <p className="text-gray-600 mb-8">{t('notFoundDesc')}</p>
        <Link
          to="/shop/blog"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('backToBlog')}
        </Link>
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back to Blog Link */}
      <Link
        to="/shop/blog"
        className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        {t('backToBlog')}
      </Link>

      {/* Article Header */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Featured Image */}
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="p-8">
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{t('publishedOn')} {post.date}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              <span>{t('by')} {post.author}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{post.readTime} {t('readTime')}</span>
            </div>
          </div>

          {!post.isFacebookEmbed && (
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Handle headings
                if (paragraph.match(/^[A-ZÁÉÍÓÚÑ][^.]*$/)) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph}
                    </h2>
                  );
                }
                
                // Handle bullet points
                if (paragraph.includes('•')) {
                  const items = paragraph.split('•').filter(item => item.trim());
                  return (
                    <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Handle numbered lists
                if (paragraph.match(/^\d+\./)) {
                  const items = paragraph.split(/\d+\./).filter(item => item.trim());
                  return (
                    <ol key={index} className="list-decimal pl-6 mb-6 space-y-2">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">
                          {item.trim()}
                        </li>
                      ))}
                    </ol>
                  );
                }

                // Regular paragraphs
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: paragraph }}>
                  </p>
                );
              })}
            </div>
          )}

          {/* Special Script for inDrive blog post */}
          {post.slug === 'viaja-seguro-colombia-indrive' && (
            <InDriveWidget />
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <TagIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium mr-2">{t('tags')}:</span>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Sharing */}
          <SocialShareButtons post={post} currentUrl={currentUrl} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('relatedPosts')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/shop/blog/${relatedPost.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={relatedPost.imageUrl}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs text-purple-600 font-medium">
                    {relatedPost.category}
                  </span>
                  <h4 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
