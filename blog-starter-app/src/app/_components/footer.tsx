import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            © 2024 Wayne的个人技术博客
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
            href="mailto:2628751928@qq.com"
            className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
          >
            商务合作
          </a>
            <a
              href="https://blog.csdn.net/qq_46686675?spm=1000.2115.3001.5343"
              className="mx-3 font-bold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              我的CSDN博客
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
