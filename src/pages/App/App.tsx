import Tokenomics from './Tokenomics.section';
import InfoRow from './InfoRow.Section';
import HomeSection from './Home.Section';
import Layout from '../../Layouts/Layout';
window.Buffer = window.Buffer || require("buffer").Buffer;

const App = () => {


  return (
    <Layout>

      <HomeSection></HomeSection>
      <InfoRow></InfoRow>
      <Tokenomics></Tokenomics>

    </Layout>
  )
}

export default App