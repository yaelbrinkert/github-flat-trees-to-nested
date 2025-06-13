import { useEffect, useState } from "react";
import "./index.css";
import { ModeToggle } from "./components/toggleTheme";
import { useTheme } from "./provider/theme-provider";
import { FileExplorer } from "./components/FileExplorer";
import { SidebarProvider } from "./components/ui/sidebar";
import Terminal, { CommandLine } from "./components/Terminal";
import { Separator } from "./components/ui/separator";
import CodeStudio, { StudioLine, StudioList } from "./components/CodeStudio";
import { getRootFoldersFromRepo } from "./lib/action";

function App() {
  const theme = useTheme();
  const [folders, setFolders] = useState();

  useEffect(() => {
    const fetch = async () => {
      const data = await getRootFoldersFromRepo();
      setFolders(data);
    };
    fetch();
  }, []);

  return (
    <div className="flex min-h-[100vh] w-full justify-center items-center gap-20 flex-col p-[50px]">
      <span className="fixed right-5 top-5">
        <ModeToggle />
      </span>
      <div className="flex flex-row gap-3 items-center">
        <h1 className="font-[Geist] font-thin text-center">
          Nesty<b>JS</b>
        </h1>
        {theme.theme === "dark" ? (
          <img
            src="/nesty-logo-lg-transparent-white.png"
            className="h-[50px]"
          />
        ) : (
          <img
            src="/nesty-logo-lg-transparent-black.png"
            className="h-[50px]"
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full justify-evenly">
        <div className="flex flex-1 font-[Montserrat] flex-col gap-5">
          <h2 className="text-3xl font-extrabold">🎯 Achieving this result.</h2>
          <p className="font-bold">1. Install dependencies & packages 📦</p>
          {/* <span className="border-1 border-accent p-5 rounded-lg bg-accent font-mono">
            <p>npm i github-flat-trees-to-nested</p>
          </span> */}
          <Terminal>
            <CommandLine>npm i github-flat-trees-to-nested</CommandLine>
            <CommandLine>npm i octokit</CommandLine>
            <CommandLine>npx shadcn@latest init</CommandLine>
            <CommandLine>npx shadcn@latest add sidebar collapsible</CommandLine>
          </Terminal>
          <p className="font-normal">
            We are not providing explanations on implementing Sidebar from
            Shadcn, just read documentation{" "}
            <a
              href="https://ui.shadcn.com/docs/components/sidebar"
              target="_blank"
              className="underline"
            >
              here
            </a>{" "}
            if needed.
          </p>
          <br />
          <p className="font-bold">
            2. Retrieve datas from your repository using Github REST API 📚
          </p>
          <CodeStudio>
            <StudioList>
              <StudioLine>{`import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.TOKEN_GITHUB,
});

export async function getRootFoldersFromRepo() {
  try {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",
      {
        owner: "OWNER",
        repo: "YOUR-REPOSITORY",
        tree_sha: "YOUR-BRANCH",
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
`}</StudioLine>
            </StudioList>
          </CodeStudio>
          <p className="font-normal">
            Make sure{" "}
            <code className="bg-accent">process.env.TOKEN_GITHUB</code> has been
            defined. Change <code className="bg-accent">OWNER</code> by the
            owner's name of the repository. Change{" "}
            <code className="bg-accent">YOUR-REPOSITORY</code> by the
            repository's name. Change{" "}
            <code className="bg-accent">tree_sha</code> by the tree sha's name
            (usually "main").
          </p>
          <br />
          <p className="font-bold">
            3. Use your favorite github-flat-trees-to-nested function ❤️
          </p>
          <p>Start by importing the function :</p>
          <CodeStudio>
            <StudioList>
              <StudioLine>{`import { buildNestedArraysShadcn } from "github-flat-trees-to-nested";
`}</StudioLine>
            </StudioList>
          </CodeStudio>
          <p>Then build your beautiful nested tree :</p>
          <CodeStudio>
            <StudioList>
              <StudioLine>{`const myDatas = await getRootFoldersFromRepo();
const myBeautifulTree = buildNestedArraysShadcn(myDatas);
`}</StudioLine>
            </StudioList>
          </CodeStudio>
          <p>
            After following these steps, you should have a pretty nested tree
            (here, usable for Shadcn file explorer component). ✅
          </p>
          <br />
          <p className="font-bold">4. Did not understand something ? ❌</p>
          <p>
            Take a closer look the boilerplate, by navigating in the folders and
            in the code files. <br />
            <br />
            The <span className="bg-accent p-0.5 rounded-lg">src</span> folder
            contains all the logic :{" "}
            <span className="bg-accent p-0.5 rounded-lg">lib</span> contains the
            call to Github REST API,{" "}
            <span className="bg-accent p-0.5 rounded-lg">components</span> &{" "}
            <span className="bg-accent p-0.5 rounded-lg">ui</span> contains all
            of the <span className="bg-accent p-0.5 rounded-lg">.tsx</span>{" "}
            files hosting the tree, and "assets" just contains
            <span className="bg-accent p-0.5 rounded-lg">.svg</span> icon.
          </p>
          <br />
          <p className="font-bold">
            5. A feedback to give, a contribution to propose ? 📩
          </p>
          <p>
            Do not hesitate to share ideas, to start contributing so we can
            create multiple nested variants. I also appreciate your honesty and
            your feedbacks to improve my boilerplate, but also the project by
            itself. Thank you for using this !
          </p>
        </div>
        <div className="flex flex-1 flex-col">
          <SidebarProvider>
            {folders != null && folders && <FileExplorer folders={folders} />}
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
