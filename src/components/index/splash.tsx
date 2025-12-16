import { styled } from '@panda/jsx';
import { FlexSection } from '../global/containers.tsx';
import { TITLE_FONTS } from '../global/typography.tsx';
import LucideChevronsDown from '~icons/lucide/chevrons-down';

const Container = styled(FlexSection, {
    base: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        position: 'relative',
    },
});

const TextContainer = styled(FlexSection, {
    base: {
        flexDirection: 'column',
        marginTop: '-10vh',
    },
});

const Name = styled('h1', {
    base: {
        fontFamily: TITLE_FONTS,
        fontSize: 'clamp(2rem, 6vw, 4rem)',
        fontWeight: 200,
        margin: 0,
        textShadow: '2px 2px 0 token(colors.purple), 4px 4px 0 token(colors.accent)',
        //    borderBottom: '4px ridge cyan',
    },
});

const Tag = styled('p', {
    base: {
        fontFamily: TITLE_FONTS,
    },
});

const Seperator = styled('span', {
    base: {
        letterSpacing: '2px',
    },
});

const ScrollIndicator = styled(LucideChevronsDown, {
    base: {
        position: 'absolute',
        fontSize: '1.6rem',
        color: 'soft !important',
        bottom: '15vh',
        animation: 'bounce 1s ease-in 0s infinite',
    },
});

const Splash = () => (
    <Container>
        <TextContainer>
            <Name>josh taylor</Name>
            <Seperator>...</Seperator>
            <Tag>java & web development</Tag>
        </TextContainer>
        <ScrollIndicator />
        {/* <TextContainer> */}
        {/*  <Heart /> */}
        {/*  <Text>welcome to my personal page,</Text> */}
        {/* </TextContainer> */}
    </Container>
);

export default Splash;
