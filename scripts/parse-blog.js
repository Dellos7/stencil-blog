const fs = require('fs');
const matter = require('gray-matter');
const Remarkable = require('remarkable');
const md = new Remarkable();

const readConfigFile = () => {
    return new Promise( (resolve, reject) => {
        const configFileName = 'blog.config.json';
        fs.readFile(configFileName, 'utf-8', (err, data) => {
            if( err ) {
                const error = `Something went wrong when reading the ${configFileName} config file: ${err}`;
                reject(error);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const parseBlog = (blogMdDir, blogDir, projectSrc, postsRoute) => {
    const blogDirPath = blogDir;
    blogDir = `${projectSrc}/${blogDir}`;
    console.log(blogDir);
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
                /*let date = contentMatter.data.date;
                let title = contentMatter.data.title;*/
                let metadata = contentMatter.data;
                let fileNameNoExtension = _file.substring(0,_file.lastIndexOf('.')); 
                let fileName = fileNameNoExtension + '.html';;
                fs.writeFileSync(`${blogDir}/${fileName}`, contentMarkdown);
                i++;
                let file = `/${blogDirPath}/${fileName}`;
                fileNames.push({
                    unique_link: fileNameNoExtension,
                    file, 
                    metadata
                });
            } catch (err) { console.error(err) }
        });
        if (fileNames && fileNames.length > 0) {
            let posts = {
                posts: fileNames,
                postsRoute: postsRoute
            };
            fs.writeFileSync(`${projectSrc}/posts.json`, JSON.stringify(posts));
        }
        console.log(`> ${i} files parsed and created in ${blogDir}!`);
    });
};

readConfigFile()
.then( (config) => {
    parseBlog(
        config.blog_src_dir ? config.blog_src_dir : 'blog-md', 
        config.blog_content_dir ? config.blog_content_dir : 'blog',
        config.project_src ? config.project_src : 'src',
        config.posts_route ? config.posts_route : 'post'
    );
})
.catch( (error) => {
    console.error(error);
});