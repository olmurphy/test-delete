import { readFileSync, readdirSync } from "fs";
import { DocumentNode } from "graphql";
import { gql } from "graphql-tag";
import { extname, join } from "path";

export function loadTypeDefsFromDir(dirPath: string): DocumentNode[] {
    const typeDefs: string[] = [];

    function loadTypeDefsRecursive(directory: string) {
        const files = readdirSync(directory);

        files.forEach(file => {
            const filePath = join(directory, file);
            const isDirectory = !extname(filePath);

            if (isDirectory) {
                loadTypeDefsRecursive(filePath);
            } else if (extname(filePath) === '.graphql') {
                const fileContent = readFileSync(filePath, { encoding: 'utf-8' });
                typeDefs.push(fileContent);
            }
        });
    }

    loadTypeDefsRecursive(dirPath);

    return typeDefs.map((typeDef) => gql(typeDef));
}
