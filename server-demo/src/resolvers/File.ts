import {FileResolvers} from "../generated/graphql";

const File: FileResolvers = {
    link: parent => {
        return `http://localhost:4000/uploads/${parent.filename}`
    }
}
export default File;