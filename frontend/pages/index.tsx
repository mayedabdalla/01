import Layout from "../component/layout";
import Create from "../component/create";
import List from "../component/list";
const twitterCard = {

}
const Home = () => {
    return (
        <Layout twitterCard={{card: 'summary', title: 'untitled', site: '@mydlala', description: " موقع UNTITLED موقع تفاعلي يهدف لتوفير خيارات أكثر لعرض الترجمات العربية لفصول المانجا والمانهوا، ويوفّر كذلك روابط مباشرة لتحميل الفصول وأيضًا قراءتها بعدة طرق."}} description=' موقع UNTITLED موقع تفاعلي يهدف لتوفير خيارات أكثر لعرض الترجمات العربية لفصول المانجا والمانهوا، ويوفّر كذلك روابط مباشرة لتحميل الفصول وأيضًا قراءتها بعدة طرق.'>
            <List/>
        </Layout>);
}

export default Home;

