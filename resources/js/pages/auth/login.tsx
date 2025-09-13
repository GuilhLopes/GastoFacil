import InputError from '@/components/input-error';
import { Logo } from '@/components/Logo';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, LogIn, Aperture } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout title="" description="">
            <Head title="Entrar" />

            {/* Logo do Gasto Fácil */}
            <div className="flex justify-center mb-6">
                <Logo />
            </div>

            <Form method="post" action={route('login')} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="seuemail@exemplo.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Senha */}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                            Esqueceu a senha?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Digite sua senha"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Lembrar-me */}
                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" tabIndex={3} />
                                <Label htmlFor="remember">Lembrar-me</Label>
                            </div>

                            {/* Botão de Login */}
                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                <LogIn className="h-4 w-4 mr-2" />
                                Entrar
                            </Button>
                        </div>

                        {/* Separador */}
                        <div className="flex items-center gap-2 my-4">
                            <div className="flex-1 h-px bg-muted" />
                            <span className="text-xs text-muted-foreground">ou continue com</span>
                            <div className="flex-1 h-px bg-muted" />
                        </div>

                        {/* Botão Google (apenas enfeite) */}
                        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2">
                            <Aperture className="h-5 w-5" />
                            Entrar com Google
                        </Button>

                        {/* Cadastro */}
                        <div className="text-center text-sm text-muted-foreground">
                            Não tem uma conta?{' '}
                            <TextLink href={route('register')} tabIndex={5}>
                                Cadastre-se
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
