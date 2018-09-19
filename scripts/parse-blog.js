const fs = require('fs');
const matter = require('gray-matter');
const Remarkable = require('remarkable');
const md = new Remarkable();

const parseBlog = (blogMdDir, blogDir) => {
    const blogDirPath = blogDir;
    blogDir = `src/${blogDir}`;
    console.log(`Starting blog parse... `);
    fs.readdir(blogMdDir, (err, files) => {
        console.log(`> Reading files from ${blogMdDir}`);
        if (err) {
            console.error(err);
        }
        if (files && files.length > 0) {
            console.log(`> ${files.length} files detected!`);
            if (!fs.existsSync(blogDir)) {
                fs.mkdirSync(blogDir);
            }
        }
        let i = 0;
        let fileNames = [];
        files.forEach((_file) => {
            let fileContent = fs.readFileSync(`${blogMdDir}/${_file}`, 'utf8');
            let contentMatter = matter(fileContent);
            let contentMarkdown = md.render(contentMatter.content);
            try {
                let date = contentMatter.data.date;
                let title = contentMatter.data.title;
                //let file = `${title}_${date.toLocaleDateString()}.html`;
                let file = `${title}.html`;
                fs.writeFileSync(`${blogDir}/${file}`, contentMarkdown);
                i++;
                file = `${blogDirPath}/${file}`;
                fileNames.push({ file, title, date });
            } catch (err) { console.error(err) }
        });
        if (fileNames && fileNames.length > 0) {
            let posts = { posts: fileNames };
            fs.writeFileSync(`src/posts.json`, JSON.stringify(posts));
        }
        console.log(`> ${i} files parsed and created in ${blogDir}!`);
    });
};

parseBlog('blog-md', 'blog');