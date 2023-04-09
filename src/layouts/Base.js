import { Container } from "@mui/material";

const Base = ({ children }) => {
    return (
        <Container 
        maxWidth='sm'
        display="flex"
        justify="center"
        alignitems="center">
            {children}
        </Container>
    );
}

export default Base;