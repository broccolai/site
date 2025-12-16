import { styled } from '@panda/jsx';
import { For } from 'solid-js';
import type { Project } from '../../data/projects';
import { Bold, H3, H4, Text } from '../global/typography.tsx';
import { Card, CardBody, CardBottomBody, CardHeader } from '../individuals/card';
import Icon from '../individuals/icon';

const StyledCardHeader = styled(CardHeader, {
    base: {
        backgroundImage: 'linear-gradient(to bottom,rgba(245,245,245,0) 85%,rgba(245,245,245,1) 100%),var(--project-card-bg)',
    },
});

const Name = styled(H3, {
    base: {
        color: 'black !important',
        fontSize: '1.4rem !important',
        fontWeight: 'normal !important',
        letterSpacing: '2px !important',
        textTransform: 'uppercase',
    },
});

const Slogan = styled(H4, {
    base: {
        color: 'gray',
        fontSize: '1rem !important',
        letterSpacing: '1px',
    },
});

const Logo = styled('img', {
    base: {
        filter: 'drop-shadow(0 8px 8px rgba(0, 0, 0, 0.6))',
        height: '6rem',
        marginBottom: '1rem',
        width: '6rem',
    },
});

interface Props {
    project: Project;
}

const ProjectCard = (props: Props) => {
    const { title, slogan, description, images, icons } = props.project;
    const { logo } = images;

    return (
        <Card>
            <StyledCardHeader>
                <Logo src={logo.src} />
                <Name>{title}</Name>
                <Slogan>{slogan}</Slogan>
            </StyledCardHeader>
            <CardBody>
                <Bold>ABOUT</Bold>
                <Text color='gray'>{description}</Text>
            </CardBody>
            <CardBottomBody>
                <For each={icons}>{(icon) => <Icon href={icon.link} Glyph={icon.glyph} basis='1.4rem' aria='meh' />}</For>
            </CardBottomBody>
        </Card>
    );
};

export default ProjectCard;
