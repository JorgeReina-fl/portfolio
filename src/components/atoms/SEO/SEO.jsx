import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
    title = 'Jorge Reina - Desarrollador Full-Stack',
    description = 'Portfolio de Jorge Reina, desarrollador full-stack especializado en React, Node.js y aplicaciones web modernas.',
    image = '/logo-morado-jr.png',
    url = 'https://jorgereina.dev',
    type = 'website'
}) => {
    return (
        <Helmet>
            {/* Meta Tags Básicos */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph (Facebook, LinkedIn) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
};

export default SEO;
