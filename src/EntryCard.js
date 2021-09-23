import {Link} from "react-router-dom";

function EntryCard({entry}) {
    const {title, entry_text} = entry
    return (
        <Link to={`/entries/${entry.id}`}>
            <tr className="table-row">
                <td>{title}</td>
                <td>{entry_text}</td>
            </tr>
        </Link>
    );
}

export default EntryCard;
