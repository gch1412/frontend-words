import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const WordsOptionCard = ({link, from, title, subtitle}) => {
    return (
        <Card className="d-flex align-items-center justify-content-center border-2 p-2" style={{minHeight: "200px"}}>
            <Link
                to={link}
                state={{ from: from }}
                className="w-100 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            style={{minHeight: "200px"}}>
                <Card.Title className="fs-4 m-0">{title}</Card.Title>
                <Card.Text className="fs-6 m-0">{subtitle}</Card.Text>
            </Link>
        </Card>
    )
}

export default WordsOptionCard