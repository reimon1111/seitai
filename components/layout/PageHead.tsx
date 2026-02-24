import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type Props = {
  title: string;
};

/** 2階層ページ上部（パンくずはエリア外・小さく、その下に背景バンド＋タイトル） */
export function PageHead({ title }: Props) {
  return (
    <>
      <div className="border-b border-neutral-100 bg-white py-3 sm:py-4">
        <Container wide>
          <Breadcrumb />
        </Container>
      </div>
      <div className="border-b border-neutral-200 bg-neutral-100 py-10 sm:py-12 md:py-14">
        <Container wide>
          <h1 className="font-serif text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
            {title}
          </h1>
        </Container>
      </div>
    </>
  );
}
