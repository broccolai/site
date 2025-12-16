import { styled } from '@panda/jsx';
import { FlexSection } from '../global/containers.tsx';

const Container = styled(FlexSection, {
    base: {
        display: 'flex',
        background: 'cyan',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
    },
});

const Intro = () => {
    return <Container>{/*<For each={projects}>{(project, i) => <ProjectCard project={project} />}</For>*/}</Container>;
};

export default Intro;
