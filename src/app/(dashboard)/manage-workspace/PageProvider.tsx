"use client"

import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2Icon, Trash2Icon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useToast} from "@/components/ui/use-toast";

const PageProvider = ({
    editor,
    wId
}:{
    editor: {email: string}[] | undefined,
    wId: string
}) => {
    if(!editor) editor = [];
    const [editorList, setEditorList] = useState(editor)
    const {toast} = useToast();

    const[inputText, setInputText] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    async function submit() {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

        try {
            setIsLoading(true);

            if(!emailRegex.test(inputText)) throw new Error("Invalid email");

            const check = editorList.some((editor) => editor.email === inputText);
            if(check) throw new Error("User already added");

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace/addEditor`, {
                method: "POST",
                body: JSON.stringify({
                    wId: wId,
                    email: inputText
                }),
                cache: "no-store"
            })
            if(!response.ok) throw new Error((await response.json()).error)

            setEditorList((prev) => {
                const list = JSON.parse(JSON.stringify(prev));
                list.push({ email: inputText })
                return list;
            })
            setInputText("")
            toast({
                description: "Successfully Added"
            })
        } catch(err: any) {
            toast({
                title: "ERROR",
                description: "Error adding user",
                variant: "destructive"
            })
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function onDelete(email: string){
        try{
            setIsLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace/addEditor`, {
                method: "DELETE",
                body: JSON.stringify({
                    wId: wId,
                    email: email,
                }),
                cache: "no-store"
            })
            if(!response.ok) throw new Error((await response.json()).error)

            setEditorList((prev) => {
                const list: {email: string}[] = [];
                prev.forEach((editor) =>{
                    if(editor.email !== email) {
                        list.push({...editor});
                    }
                })
                return list;
            });
            toast({
                description: "Successfully deleted",
            })
        } catch (err: any) {
            toast({
                title: "ERROR",
                description: "Error deleting user",
                variant: "destructive"
            })
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className=" mt-5">
            {!editorList.length &&
                <p className=" text-muted-foreground text-sm">No editors Added. <br /> <span className=" text-xs">Only you can edit this workspace</span></p>
            }
            {!!editorList.length && <ScrollArea className="max-h-52 outline outline-2 outline-primary/80 py-2 px-1 rounded-md outline-offset-2 text-sm !overflow-auto">
                {editorList.map((editor) => {
                    return (
                        <div key={editor.email} className=" flex justify-between mb-1.5 items-center">
                            <p> {editor.email} </p>
                            <Button variant="outline"
                                    size="icon"
                                    className=" h-7 w-8 px-1.5 py-1"
                                    onClick={() => onDelete(editor.email)}
                            >
                                <Trash2Icon />
                            </Button>
                        </div>
                    )
                })}
            </ScrollArea>}
            <div className= "flex flex-col gap-y-2.5 mt-5">
                <Input onChange={(e) => setInputText(e.target.value)}
                       type="email"
                       placeholder="Type editor's email"
                       value={inputText}
                       onKeyDown={async (e) =>{
                           if(e.key === "Enter") await submit();
                       } }
                />
                <Button onClick={submit}
                        className=" w-fit text-sm h-7"
                        type="submit"
                        disabled={isLoading}
                >
                    { isLoading && <Loader2Icon className=" absolute animate-spin" />}
                    <span className={cn(isLoading ? " text-foreground/30": "" )}>ADD</span>
                </Button>
            </div>
        </div>
    )
}

export default PageProvider;