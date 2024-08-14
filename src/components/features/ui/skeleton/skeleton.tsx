import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import styles from "@/components/features/ui/header/Header.module.css";

export const AppSkeleton = () => {
  return (
    <>
      <header className={`${styles.header} py-3 bg-[#FEFCEE] shadow-sm`}>
        <Skeleton className="min-[400px]:w-32 h-full w-60 rounded-md" />
        <div className="flex gap-3 w-auto items-center">
          <Skeleton className="min-[400px]:mb-2 max-[400px]:w-28 size-10 rounded-full" />
          <Skeleton className="min-[400px]:mb-2 max-[400px]:w-28 h-3 w-40 rounded-full" />
        </div>
      </header>
      <main>
        <article className="flex flex-col gap-2 w-full h-full">
          <section className="size-full">
            <Card className="h-full" radius="sm" shadow="sm">
              <CardHeader className="h-14">
                <Skeleton className="w-60 h-full rounded-md" />
              </CardHeader>
              <CardBody className="grid gap-5">
                <div className="w-full flex gap-10">
                  <div className="flex gap-1 w-auto items-center">
                    <Skeleton className="size-5 rounded-full" />
                    <Skeleton className="h-2 w-20 rounded-full" />
                  </div>
                  <div className="flex gap-1 w-auto items-center">
                    <Skeleton className="size-5 rounded-full" />
                    <Skeleton className="h-2 w-20 rounded-full" />
                  </div>
                </div>
                <Skeleton className="w-full h-5 rounded-full" />
              </CardBody>
              <CardFooter className="flex justify-between">
                <Skeleton className="w-52 h-3 rounded-md" />
                <Skeleton className="w-60 h-3 rounded-md" />
              </CardFooter>
            </Card>
          </section>
          <section className="flex max-md:flex-col gap-2 size-full">
            <div className="md:max-w-sm size-full">
              <Card className="h-full" radius="sm" shadow="sm">
                <CardHeader className="h-14">
                  <Skeleton className="w-60 h-full rounded-md" />
                </CardHeader>
                <CardBody>
                  <Skeleton className="size-full max-w-60 rounded-md mx-auto" />
                </CardBody>
                <CardFooter>
                  <Skeleton className="w-full h-10 rounded-md" />
                </CardFooter>
              </Card>
            </div>
            <div className="size-full">
              <Card className="h-full" radius="sm" shadow="sm">
                <CardHeader className="h-14">
                  <Skeleton className="w-60 h-full rounded-md" />
                </CardHeader>
                <CardBody>
                  <Skeleton className="size-full max-w-60 rounded-md mx-auto" />
                </CardBody>
                <CardFooter>
                  <Skeleton className="w-full h-10 rounded-md" />
                </CardFooter>
              </Card>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};
