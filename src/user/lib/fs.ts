import {
  FileNotFoundError,
  Filesystem,
  File,
  getMounts,
  FileMode,
  FileInfo,
} from "../../kernel/fs";

function locateFs(fname: string): Filesystem {
  for (const [mountpoint, fs] of getMounts()) {
    if (fname.startsWith(mountpoint)) {
      return fs;
    }
  }

  throw new FileNotFoundError();
}

export async function open(fname: string, mode: FileMode): Promise<File> {
  return locateFs(fname).open(fname, mode);
}

export async function mkdir(path: string): Promise<void> {
  return locateFs(path).mkdir(path);
}

export async function readdir(path: string): Promise<FileInfo[]> {
  return locateFs(path).readdir(path);
}

export async function makeroot(): Promise<void> {
  // FHS-like directory structure
  // TODO: finish this up
  await mkdir("/bin");
  await mkdir("/etc");
}
