import type { PipelineStage } from "@/lib/types";

/**
 * "UNDER THE HOOD" — what actually happens between source code
 * and a running program.
 */
export const pipelineStages: PipelineStage[] = [
  {
    id: "source",
    title: "Source Code",
    tag: "You",
    description: "The program as a human writes it — plain text with meaning only to the author and the compiler.",
    detail: [
      "Written in a language (here: C) that balances human intent with machine reality.",
      "Says what should happen, not yet how the machine will do it.",
      "Compilers do not read it like humans do — they parse structure, not intent.",
    ],
    sample: { lang: "c", code: 'int add(int a, int b) {\n    return a + b;\n}' },
  },
  {
    id: "preprocessor",
    title: "Preprocessor",
    tag: "cc -E",
    description: "The first stage: text-level transformation before real compilation begins.",
    detail: [
      "Handles #include, #define, and conditional compilation — pure text manipulation.",
      "Expands macros, inlines headers, strips comments.",
      "Output is still C, just expanded.",
    ],
    sample: { lang: "sh", code: "$ gcc -E program.c -o program.i" },
  },
  {
    id: "compiler",
    title: "Compiler",
    tag: "cc -S",
    description: "Translates C into assembly — the human-readable form of machine instructions.",
    detail: [
      "Parses the source into an abstract syntax tree.",
      "Applies optimizations at the source level.",
      "Lowers to target-specific assembly for the CPU's instruction set.",
    ],
    sample: { lang: "asm", code: "add:\n    lea (%rdi,%rsi), %eax\n    ret" },
  },
  {
    id: "assembler",
    title: "Assembler",
    tag: "as",
    description: "Turns assembly mnemonics into actual machine code — raw bytes the CPU understands.",
    detail: [
      "Each mnemonic becomes an opcode plus operands.",
      "Generates an object file with code, data, and a symbol table.",
      "Symbols still unresolved — addresses are placeholders at this point.",
    ],
    sample: { lang: "sh", code: "$ gcc -c program.s -o program.o" },
  },
  {
    id: "object",
    title: "Object File",
    tag: ".o",
    description: "Machine code for this one translation unit, not yet runnable on its own.",
    detail: [
      "Contains .text (code), .data (initialized data), .bss (zeroed data).",
      "Has a symbol table with undefined references to external functions.",
      "Inspectable with readelf / objdump — worth doing at least once.",
    ],
    sample: { lang: "sh", code: "$ readelf -h program.o" },
  },
  {
    id: "linker",
    title: "Linker",
    tag: "ld",
    description: "Combines object files and libraries into one executable, resolving all the addresses.",
    detail: [
      "Merges code and data from every object file.",
      "Resolves symbols across files and static libraries.",
      "Produces the executable — a complete, self-consistent image.",
      "This is where 'undefined reference' errors live.",
    ],
    sample: { lang: "sh", code: "$ gcc program.o libutil.o -o program" },
  },
  {
    id: "executable",
    title: "Executable",
    tag: "ELF",
    description: "A file on disk with a defined format — headers, sections, and entry point, ready to be loaded.",
    detail: [
      "On Linux, an ELF file: header, program headers, sections, symbol table.",
      "Not 'running' — just bytes on disk with a load plan inside.",
      "The OS will read that plan to bring it to life.",
    ],
    sample: { lang: "sh", code: "$ file program\nprogram: ELF 64-bit LSB executable" },
  },
  {
    id: "loader",
    title: "Loader",
    tag: "execve",
    description: "The OS reads the executable and prepares it to run as a process.",
    detail: [
      "Kernel parses the ELF headers.",
      "Maps segments into a fresh virtual address space.",
      "Sets up the stack, environment, and entry point.",
      "All of this happens inside the execve system call.",
    ],
    sample: { lang: "c", code: 'execve("./program", argv, envp);' },
  },
  {
    id: "process",
    title: "Process",
    tag: "PID",
    description: "A running program: code, heap, stack, file descriptors, and its own address space.",
    detail: [
      "An address space isolated from every other process.",
      "Scheduled by the OS — time on the CPU is granted, not owned.",
      "Interacts with the world only through system calls.",
    ],
    sample: { lang: "sh", code: "$ ps -p 1234 -o pid,stat,cmd" },
  },
  {
    id: "memory",
    title: "Memory",
    tag: "VAS",
    description: "Where the program lives: text, data, heap, stack — virtual addresses mapped to physical pages.",
    detail: [
      "The stack grows down (locals, frames); the heap grows up (allocations).",
      "Virtual memory lets each process believe it owns the whole address space.",
      "The MMU translates virtual → physical per page, with caching on top.",
    ],
    sample: { lang: "sh", code: "$ cat /proc/1234/maps" },
  },
  {
    id: "cpu",
    title: "CPU",
    tag: "fetch-execute",
    description: "The actual execution: instructions are fetched, decoded, and executed, one cycle at a time.",
    detail: [
      "Program counter walks the code; registers hold working data.",
      "Branch prediction, caches, and pipelines hide latency.",
      "This is the bottom of the stack — everything above exists to reach here.",
    ],
    sample: { lang: "asm", code: "add %rsi, %rax   # what the CPU actually does" },
  },
];

export const pipelineSampleName = (id: string) => pipelineStages.find((s) => s.id === id);