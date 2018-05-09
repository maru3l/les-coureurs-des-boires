// Vendor
import React from 'react';

// vendor components
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

// Utils
import PropTypes from 'prop-types';

// Components
import Col from '../../components/Col';
import PageTitle from './../../components/PageTitle';

// styles
import './style.scss';

const LesCoureursPage = ({
  data: {
    site: {
      siteMetadata: { siteUrl, title: siteTitle },
    },
    portraitMartin: {
      childImageSharp: { sizes: portraitMartin },
    },
    portraitDavid: {
      childImageSharp: { sizes: portraitDavid },
    },
  },
}) => (
  <React.Fragment>
    <Helmet>
      <title>{`Les coureurs | ${siteTitle}`}</title>
      <meta
        name="description"
        content="Auteurs et conférenciers maintes fois primés pour leurs livres et leurs recherches inusitées dans le monde brassicole"
      />

      <meta name="twitter:card" value="summary" />

      <meta
        property="og:title"
        content="Les coureurs | Les coureurs des boires"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/les-coureurs`} />
      {/* <meta property="og:image" content={this.article.hero.ogMeta.src} /> */}
      <meta
        property="og:description"
        content="Auteurs et conférenciers maintes fois primés pour leurs livres et leurs recherches inusitées dans le monde brassicole"
      />
      <meta property="og:site_name" content="Les coureurs des boires" />

      <link rel="canonical" href={`${siteUrl}/les-coureurs`} />
    </Helmet>
    <PageTitle title="Les coureurs" />

    <div className="les-coureurs">
      <div className="les-coureurs__content">
        <h1 className="les-coureurs__title">Les Coureurs</h1>

        <div className="les-coureurs__intro-text">
          <p>
            Les Coureurs des Boires, c’est nous: Martin Thibault et David
            Lévesque Gendron, deux auteurs québécois passionnés. Passionnés par
            la bière dans son ensemble, mais principalement par sa capacité à
            nous faire voyager tant de le confort de notre salon qu’en des
            contrées où nous ne nous rendrions pas intuitivement. Notre
            passe-temps favori est ultimement notre spécialité: nous chassons
            les grands crus à travers le monde, combinant notre intérêt pour le
            voyage à celui de l’exploration de la gamme infinie des flaveurs de
            la bière. Notre souhait le plus cher: que la bière se trouve une
            place de choix sur les grandes et petites tables du Québec et
            d’ailleurs. Pourquoi? Parce qu’elle le mérite, et parce que nous le
            méritons.
          </p>
        </div>
      </div>

      <div className="les-coureurs__photos-section">
        <figure>
          <Img
            className="les-coureurs__image"
            sizes={portraitMartin}
            alt="Portait de Martin Thibault."
          />

          <figcaption>Martin Thibault</figcaption>
        </figure>

        <figure>
          <Img
            className="les-coureurs__image"
            sizes={portraitDavid}
            alt="Portait de David Lévesque-Gendron."
          />

          <figcaption>David Lévesque-Gendron</figcaption>
        </figure>
      </div>
    </div>

    <Col title="Publications">
      <p>Trois livres à succès, décrits sur la page ‘Livres’ de ce site</p>
      <p>
        5 articles vedettes dans le magazine américain Beer Connoisseur, dont un
        ayant permis à Martin de gagner un premier prix de la North American
        Guild of Beer Writers
      </p>
      <p>
        4 articles vedettes (« features ») dans le magazine Beer Advocate, dont
        un ayant permis à Martin de gagner un autre prix de la North American
        Guild of Beer Writers
      </p>
      <p>
        Collaboration dans le Pocket Beer Guide 2013 de Tim Webb (section
        Lituanie)
      </p>
      <p>Quelques douzaines d’articles dans le journal Bières et plaisirs</p>
      <p>
        Quelques douzaines d’articles dans le Journal de Montréal (de façon
        hebdomadaire depuis 2015)
      </p>
      <p>
        Quelques douzaines d’articles dans le défunt journal Les Carnets de ma
        bière
      </p>
      <p>
        Une bonne douzaine d’autres idées de livres à publier au fil des
        prochaines années!
      </p>
    </Col>

    <Col title="Conférences, cours, dégustations dirigées">
      <p>
        Dans des festivals tels Bières et Saveurs de Chambly et l’Oktoberfest de
        Repentigny
      </p>
      <p>
        Pour le congrès de l’Association des microbrasseries du Québec (AMBQ)
      </p>
      <p>Pour le Master Brewers Association of the Americas (MBAA)</p>
      <p>Pour l’école MBière du Mondial de la Bière</p>
      <p>Pour le programme ‘Sommelier-bière’ de la Cité Collégiale, à Ottawa</p>
      <p>Pour former des employés de microbrasseries et de bars spécialisés</p>
      <p>Pour l’Association des brasseurs amateurs du Québec (LABAQ)</p>
      <p>
        Dans plusieurs bibliothèques du Québec (Boucherville, Montréal,
        St-Jean-sur-Richelieu, etc.)
      </p>
      <p>Chez des particuliers</p>
    </Col>

    <div className="les-coureurs__others">
      <div className="les-coureurs__others-col les-coureurs__others-col-1">
        <iframe
          title="Vidéo de présentation du livre «Les saveurs gastronomiques de la bière»."
          src="https://player.vimeo.com/video/72372393"
          width="640"
          height="360"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="les-coureurs__others-col les-coureurs__others-col-2">
        <p className="les-coureurs__others-title">Autres</p>
        <p>
          Administrateurs du contenu québécois du site Ratebeer.com, ayant la
          plus grande base de données brassicole au monde, depuis 15 ans
        </p>

        <p>
          Co-organisateurs de divers événements, notamment les Soirées des
          Grands Crus au Siboire, depuis avril 2011, les Prix du Public Bière,
          depuis 2015, les Meet The Brewer au Festival Bières et Chambly, depuis
          2017, et le Winter Warmer Montréal, l’Hivernale des Brasseurs.
        </p>

        <p>
          Avons creusé les scènes brassicoles de plus de 25 pays, des grandes
          villes aux campagnes reculées, depuis plus de 15 ans
        </p>

        <p>
          Avons inspiré le New York Times à inclure la Lituanie dans les pays à
          visiter en 2013 grâce à nos recherches brassicoles dans les campagnes
          du nord-est là-bas
        </p>

        <p>
          Entrevues dans les médias: télé, journaux, magazines et radio à
          Radio-Canada, RDI, etc.
        </p>

        <p>
          <b>IMPORTANT:</b>
        </p>

        <p>
          Depuis 2016, David est co-propriétaire de la Microbrasserie Vox
          Populi. Martin, de son côté, développe une gamme de bières
          traditionnelles signée ‘Les Coureurs des Boires’ à la brasserie
          Oshlag.
        </p>

        <p>
          Afin d’éviter tout conflit d’intérêt, nous nous engageons à ne jamais
          profiter de notre pouvoir médiatique dans le Journal de Montréal,
          Bières et Plaisirs, Beer Advocate ou toute autre publication
          officielle, pour faire la promotion de ces brasseries.{' '}
        </p>
      </div>
    </div>
  </React.Fragment>
);

export const query = graphql`
  query LesCoureursPageQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    portraitMartin: file(name: { eq: "portrait-martin-thibault" }) {
      childImageSharp {
        sizes(maxWidth: 336, quality: 80) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    portraitDavid: file(name: { eq: "portrait-david-levesque-gendron" }) {
      childImageSharp {
        sizes(maxWidth: 336, quality: 80) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`;

LesCoureursPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default LesCoureursPage;
